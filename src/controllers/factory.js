import { catchAsync, FeaturedAPI } from '../utils';

export const createOne = Model =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res.formatter.created(doc);
  });

export const getAll = Model =>
  catchAsync(async (req, res) => {
    const advancedApi = new FeaturedAPI(req.query, Model.find())
      .filter()
      .sort()
      .limitFields();
    const docs = await advancedApi.query;
    res.formatter.ok(docs, { results: docs.length });
  });

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res) => {
    const query = Model.findById(req.params.id);
    if (populateOptions) query.populate(populateOptions);

    const doc = await query;
    res.formatter.ok(doc);
  });

export const updateOne = Model =>
  catchAsync(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.formatter.ok(doc);
  });

export const deleteOne = Model =>
  catchAsync(async (req, res) => {
    await Model.findByIdAndDelete(req.params.id);
    res.formatter.noContent();
  });
