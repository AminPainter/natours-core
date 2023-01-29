export default class FeaturedAPI {
  #userQuery;
  #mongooseQuery;

  constructor(userQuery, mongooseQuery) {
    this.#userQuery = userQuery;
    this.#mongooseQuery = mongooseQuery;
  }

  get query() {
    return this.#mongooseQuery;
  }

  filter() {
    const queryObj = { ...this.#userQuery };
    ['fields', 'limit', 'page', 'sort'].forEach(
      param => delete queryObj[param]
    );

    const queryString = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte)\b/g,
      match => `$${match}`
    );

    this.#mongooseQuery = this.#mongooseQuery.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.#userQuery.sort)
      this.#mongooseQuery = this.#mongooseQuery.sort(
        this.#userQuery.sort.split(',').join(' ')
      );
    else this.#mongooseQuery = this.#mongooseQuery.sort('-createdAt');

    return this;
  }

  limitFields() {
    if (this.#userQuery.fields)
      this.#mongooseQuery = this.#mongooseQuery.select(
        this.#userQuery.fields.split(',').join(' ')
      );
    else this.#mongooseQuery = this.#mongooseQuery.select('-__v');

    return this;
  }
}
