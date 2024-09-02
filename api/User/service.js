const User = require("./index");
const bcrypt = require("bcryptjs");

const findOne = async (email) => {
  return await User.findOne(email );
};

const findById = async (id) => {
  return await User.findById(id);
};

const checkPhoneExists = async (phoneNumber) => {
  return await User.findOne({ phoneNumber });
};

const createUser = async (params) => {
  await User.create(params);
  return { message: "New User Created Successfully" };
};

const find = async (params) => {
  const { role, limit, page } = params;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const pipeline = [
    {
      $match: { role: role },
    },
    {
      $facet: {
        metadata: [{ $count: "totalCount" }],
        data: [
          { $skip: parseInt(skip) },
          { $limit: parseInt(limit) },
          { $project: { password: 0 } },
        ],
      },
    },
  ];

  const result = await User.aggregate(pipeline);
  const totalCount = result[0]?.metadata[0]?.totalCount;
  const users = result[0]?.data;

  return {
    totalCount,
    limit: parseInt(limit),
    data: users,
    page: parseInt(page),
    totalPages: Math.ceil(totalCount / limit),
  };
};

module.exports = {
  createUser,
  find,
  findOne,
  checkPhoneExists,
  findById,
};
