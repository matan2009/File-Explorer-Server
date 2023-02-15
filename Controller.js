const mongo = require('./mongo')
const ObjectId = require('mongodb').ObjectId

exports.getDirItems = async(req,res) => {
    var request;
    if (req.query) {
        var parentId = req.query.parent_id
        if( parentId != '') {
            parentId = new ObjectId(parentId)
        }
        request = {"parent_id": parentId};    
    }
    else{
        request = req
    }
    var documents = await mongo.locate(request)
    res.set('Access-Control-Allow-Origin', '*')
    res.send(documents)
}

exports.postAddItem = async(req,res) => {
    const name = req.body.name
    const itemType = req.body.item_type
    var parentId = req.body.parent_id
    if (parentId){
        parentId = new ObjectId(parentId)
    }
    const document = {"name": name, "parent_id": parentId, "item_type": itemType}
    const insertedDoc = await mongo.add(document)
    
    const parentDocFilter = {"parent_id": parentId} 
    await this.getDirItems(parentDocFilter, res)
}

exports.putUpdateItem = async(req,res) => {
    var itemId = req.body._id
    if (itemId){
        itemId = new ObjectId(itemId)
    }
    const updatedName = req.body.name
    const itemFilter = {"_id": itemId}
    await mongo.update(itemFilter, {"name": updatedName})

    var parentId = req.body.parent_id
    if (parentId){
        parentId = new ObjectId(parentId)
    }
    const parentDocFilter = {"parent_id": parentId} 
    await this.getDirItems(parentDocFilter, res) 
}

exports.deleteRemoveItem = async(req,res) => {
    var itemId = req.query._id
    if (itemId){
        itemId = new ObjectId(itemId)
    }
    const itemFilter = {"_id": itemId}
    await mongo.remove(itemFilter)

    var parentId = req.query.parent_id
    if (parentId){
        parentId = new ObjectId(parentId)
    }    
    const parentDocFilter = {"parent_id": parentId} 
    await this.getDirItems(parentDocFilter, res)
}
