// http://localhost:5000/api/event/getAllEvents?limit=4&page=1&search=eventName:Node for testing

module.exports.pagination = (req) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  let sortOptions = {};

  if (req.query.sort) {
    const str = req.query.sort.split(":");
    sortOptions[str[0]] = str[1] === "desc" ? -1 : 1;
  } else {
    sortOptions = { createdAt: 1 };
  }

  let searchOptions = {};
  if (req.query.search) {
    const str = req.query.search.split(":");
    searchOptions[str[0]] = { $regex: str[1], $options: "$i" };
  }
  if(req.body.where){
    searchOptions = { ...searchOptions, ...req.body.where}
  }
  return { searchOptions, limit, skip, sortOptions };
};
