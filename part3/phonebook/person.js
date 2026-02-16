const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI
mongoose.connect(url, { family: 4 })
  .then(result => { console.log(result) })
  .catch(result => { console.log(result) })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id.toString()
    delete object._id
    delete object.__v
  },
})

module.exports = mongoose.model("Person", personSchema)