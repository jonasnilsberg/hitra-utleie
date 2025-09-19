# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Copy
COPY go.mod go.sum main.go ./

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux go build -o pocketbase .

FROM alpine:latest

RUN apk add --no-cache \
    unzip \
    ca-certificates

COPY --from=builder /app/pocketbase pb/pocketbase

# # uncomment to copy the local pb_migrations dir into the image
COPY ./pb_migrations pb/pb_migrations

# # uncomment to copy the local pb_hooks dir into the image
# # COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

# # start PocketBase
CMD ["./pb/pocketbase", "serve", "--http=0.0.0.0:8080"]

