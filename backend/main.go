package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/joho/godotenv"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/resend/resend-go/v2"
)

type EnvironmentVariable string

type Equipment struct {
	Id            string `json:"id" db:"id"`
	Title         string `json:"title" db:"title"`
	CategoryTitle string `json:"category_title" db:"category_title"`
}

type Environment string

const (
	Development Environment = "development"
	Production  Environment = "production"
)

const (
	ENVIRONMENT    EnvironmentVariable = "ENVIRONMENT"
	RESEND_API_KEY EnvironmentVariable = "RESEND_API_KEY"
	SENTRY_DSN     EnvironmentVariable = "SENTRY_DSN"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	apiKey := os.Getenv(string(RESEND_API_KEY))
	sentryDsn := os.Getenv(string(SENTRY_DSN))

	environment := os.Getenv(string(ENVIRONMENT))
	if environment == "" {
		environment = string(Development)
	}

	err = sentry.Init(sentry.ClientOptions{
		Dsn:         sentryDsn,
		Environment: environment,
		EnableLogs:  true,
	})

	ctx := context.Background()
	logger := sentry.NewLogger(ctx)

	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}

	defer sentry.Flush(2 * time.Second)

	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir: "./pb/pb_data",
	})

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public"), false))

		return se.Next()
	})

	app.OnRecordCreateRequest("leads").BindFunc(func(e *core.RecordRequestEvent) error {
		name := e.Record.GetString("name")
		email := e.Record.GetString("email")
		phone := e.Record.GetString("phone")
		equipmentId := e.Record.GetString("equipment")
		var equipment Equipment

		err := app.DB().NewQuery("SELECT e.id, e.title, c.title as category_title FROM equipment as e left join categories as c on e.category = c.id WHERE e.id = {:id}").Bind(dbx.Params{
			"id": equipmentId,
		}).One(&equipment)
		if err != nil {
			logError(fmt.Errorf("Could not find equipment with id: %s. Error: %w", equipmentId, err))
			return err
		}

		client := resend.NewClient(apiKey)

		equipmentLink := fmt.Sprintf("https://hitra-utleie-admin.jonasvps.xyz/kategorier/%s/utstyr/%s", equipment.CategoryTitle, equipment.Id)

		params := &resend.SendEmailRequest{
			From: "Hitra Utleie AS <hitra-utleie@resend.dev>",
			To:   []string{"jonas.refsnes@gmail.com"},
			Html: fmt.Sprintf(`
			<strong>Ny interessemelding om leie av <a href="%s">%s</a></strong>
				<p>Kontakt:<p/>
				<p>Navn: %s</p>
				<p>E-post: %s</p>
				<p>Telefon: %s</p>`, equipmentLink, equipment.Title, name, email, phone),
			Subject: "Ny interessemelding fra " + name,
		}

		sent, err := client.Emails.Send(params)
		if err != nil {
			logError(fmt.Errorf("could not send email with resend. Error: %w", err))
			return err
		}

		logger.Info().String("name", name).String("email", email).String("phone", phone).String("equipmentId", equipmentId).String("equipmentTitle", equipment.Title).
			String("emailId", sent.Id).Emit("New lead created for equipment %s", equipment.Title)

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func logError(err error) {
	sentry.CaptureException(err)
	log.Println(err)
}
