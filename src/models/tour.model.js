import mongoose from 'mongoose';
import slugify from 'slugify';

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration in days'],
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty can be one of: [easy, medium, hard]',
      },
      required: [true, 'A tour must have a difficulty'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a maximum group size'],
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      required: [true, 'A tour must have a description'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    imageCover: String,
    images: {
      type: [String],
      validate: {
        validator: val => val.length === 3,
        message: 'A tour must have exactly 3 images',
      },
    },
    startDates: {
      type: [Date],
      required: [true, 'A tour must have start dates'],
    },
    guides: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
    },
    slug: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

schema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', schema);
export default Tour;
