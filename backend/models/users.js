const mongoose = require('mongoose')

const collectionName = 'users'
const schemaName = 'users'
const SchemaTypes = mongoose.Schema

const schema = new mongoose.Schema(
  {
    _id: { type: SchemaTypes.ObjectId, auto: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    dateStarted: { type: Date, required: true, trim: true },
    salary: { type: Number, required: true, trim: true },
    position: { type: String, required: true, trim: true }, // manager/driver/worker
    managerId:{type:String,required:false,trim:true},//this property is just for employee - details about the manager
    managerName:{type:String,required:false,trim:true},//this property is just for employee - details about the manager
  },
  { strict: false, autoCreate: true, timestamps: true }
)

const model = mongoose.model(schemaName, schema, collectionName)

module.exports = model
module.exports.schema = schema
