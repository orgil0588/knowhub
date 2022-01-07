const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CategorySchema.virtual("quiz", {
  ref: "Quiz",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

CategorySchema.pre("remove", async function (next) {
  console.log("removing");
  await this.model("Quiz").deleteMany({ category: this._id });
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
