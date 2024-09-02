
const paginate = async (serviceFunction, params) => {
    const { page, limit,...rest } = params;
  
    const paginationOptions = {
        page,
      limit,
      skip: (page-1)*limit
    };
  
    return await serviceFunction({ ...rest, ...paginationOptions });
  };

  module.exports = { paginate };
