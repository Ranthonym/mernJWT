const mongooe = require("mongoose");

const TodoSchema = new mongooe.Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
