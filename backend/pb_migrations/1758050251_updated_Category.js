/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3212059534")

  // update collection data
  unmarshal({
    "name": "categories"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3212059534")

  // update collection data
  unmarshal({
    "name": "Category"
  }, collection)

  return app.save(collection)
})
