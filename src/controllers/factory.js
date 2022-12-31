import { catchAsync } from '../utils';

export const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.formatter.created(doc);
  });

export const getAll = Model =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find(req.query);
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
