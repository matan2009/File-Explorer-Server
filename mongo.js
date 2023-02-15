const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const uri = 'mongodb+srv://File_Explorer:<password>@fileexplorer.qngivzp.mongodb.net/test'
const setttigs = { useNewUrlParser: true }
const client = new MongoClient(uri, setttigs)
const collection = client.db('File_Explorer_Db').collection('Items')

exports.connector = async () => {
    try {
        await client.connect();
        console.log("Connected to mongoDB succesfully")
    } catch (err) {
        console.log("Error Connecting to MongoDB", err);
    } 
}

exports.locate = async(filter) => {
    return await collection.find(filter).toArray()
}

exports.update = async(filter, update) => {
    return await collection.findOneAndUpdate(filter, {$set: update})
} 

exports.add = async(document) => {
    return await collection.insertOne(document)
}

exports.remove = async(filter) => {
    return await collection.deleteOne(filter)
}
