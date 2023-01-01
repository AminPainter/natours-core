import { catchAsync } from '../utils';

export const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.formatter.created(doc);
  });

export const getAll = Model =>
  catchAsync(async (req, res, next) => {
    const queryObj = { ...req.query };
    ['fields', 'limit', 'page', 'sort'].forEach(
      param => delete queryObj[param]
    );

    const queryString = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    );
    let query = Model.find(JSON.parse(queryString));

    if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '));
    else query = query.sort('-createdAt');

    if (req.query.fields)
      query = query.select(req.query.fields.split(',').join(' '));
    else query = query.select('-__v');

    const docs = await query;
    res.formatter.ok(docs, { results: docs.length });
  });

export const getOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    res.formatter.ok(doc);
  });

export const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.formatter.ok(doc);
  });

export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);
    res.formatter.noContent();
  });
