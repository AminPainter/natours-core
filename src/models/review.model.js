import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, 'A review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    tour: {
      type: mongoose.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a tour.'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user'],
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre('find', function () {
  this.populate({
    path: 'user',
    select: 'name picture',
  });
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
