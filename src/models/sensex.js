// const softDelete = require('mongoose-softdelete');
// const timestamps = require('mongoose-timestamp');
const {Schema, model} = require('mongoose')
const SensexSchema = new Schema({
  open: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// SensexSchema.plugin(softDelete);
// SensexSchema.plugin(timestamps);

const Sensex = model('Sensex', SensexSchema);
module.exports = Sensex
