import mongoose from 'mongoose';
import slugify from 'slugify';

const pointSchema = new mongoose.Schema({
  description: String,
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: [true, 'A tour must have coordinates for its location fields'],
  },
  address: String,
  day: Number,
});

const tourSchema = new mongoose.Schema(
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
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
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
    startLocation: {
      type: pointSchema,
      required: [true, 'A tour must have a start location'],
    },
    locations: [pointSchema],
    slug: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
export default Tour;
