/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3071488795")

  // remove field
  collection.fields.removeById("relation3414765911")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3071488795")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3605435846",
    "hidden": false,
    "id": "relation3414765911",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "info",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
