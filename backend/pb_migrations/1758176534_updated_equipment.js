/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3071488795")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "file3760176746",
    "maxSelect": 4,
    "maxSize": 0,
    "mimeTypes": [
      "image/png",
      "image/svg+xml",
      "image/jpeg",
      "image/vnd.mozilla.apng"
    ],
    "name": "images",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3071488795")

  // remove field
  collection.fields.removeById("file3760176746")

  return app.save(collection)
})
