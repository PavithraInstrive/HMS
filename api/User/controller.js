const service = require("./service");
const boom = require("@hapi/boom");
const { generateTokens } = require("../../system/middleware/jwt");
const bcrypt = require("bcryptjs");
const { paginate } = require("../../system/middleware/paginate");

const signUp = async (req) => {
  const { email, phoneNumber, role, patientDetails, doctorDetails, password } =
    req.body;

  const userExistsEmail = await service.findOne({ email });
  const userExistsPhoneNumber = await service.findOne({ phoneNumber });

  if (userExistsEmail) {
    throw boom.conflict("Email is Already Registered.");
  } else if (userExistsPhoneNumber) {
    throw boom.conflict("Phone number is Already Registered.");
  }

  if (role === "Doctor" && patientDetails) {
    throw boom.badRequest("Patient details are not allowed for doctors.");
  }

  if (role === "Patient" && doctorDetails) {
    throw boom.badRequest("Doctor details are not allowed for patients.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const userData = { ...req.body, password: hashedPassword };

  const result = await service.createUser(userData);
  return { message: result.message };
};

const login = async (req) => {
  const { email, password } = req.body;
  console.log(req.body);
  

  const user = await service.findOne({email});
  console.log(user);

  if (!user) {
    throw boom.badRequest("User not found.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw boom.badRequest("Incorrect credential");
  }

  const payload = {
    user: {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
  };

  const { token, refreshToken } = await generateTokens(payload);

  return {
    message: "Sign In Successfully",
    accessToken: token,
    refreshToken: refreshToken,
  };
};

const getDoctors = async (req, res, next) => {
    const {limit,page } = req.query;

    if (!limit || limit <= 0) {
        throw boom.badRequest('Limit must be greater than 0');
    }
    if (!page || page <= 0) {
        throw boom.badRequest('Page must be greater than 0');
      }

    const doctorList = await service.find(req.query);

    const result = {
      message: "Data fetched successfully",
      data: doctorList.data,
      totalCount: doctorList.totalCount,
      currentPage: doctorList.page,
    };

    return result;
  
};

// const getPatients = async (req, res, next) => {
//     try {
//         const patientList = await paginate(service.find, req.query);
//         return patientList
//     } catch (err) {
//         if (err.message === 'User does not exist') {
//             return next(boom.badRequest(err.message));
//         }
//         console.error(err.message);
//         return next(boom.internal('Server error'));
//     }
// };

module.exports = {
  signUp,
  login,
  getDoctors,
  // getPatients,
};
