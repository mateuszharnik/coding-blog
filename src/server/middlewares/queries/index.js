const getRequestQueries = (req, res, next) => {
  const { sort = 'desc' } = req.query;
  let { skip = 0, limit = 6 } = req.query;

  skip = parseInt(skip, 10) || 0;
  limit = parseInt(limit, 10) || 6;

  req.pagination = {
    skip: Number(skip < 0 ? 0 : skip),
    limit: Number(Math.min(50, Math.max(1, limit))),
    sort: { created_at: sort === 'desc' ? -1 : 1 },
  };

  next();
};

export default getRequestQueries;
