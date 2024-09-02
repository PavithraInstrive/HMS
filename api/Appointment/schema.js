const Joi = require('joi');

const signUp = {
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.base': `Name should be a type of 'text'`,
                'string.empty': `Name cannot be an empty field`,
                'string.min': `Name should have a minimum length of {#limit}`,
                'string.max': `Name should have a maximum length of {#limit}`,
                'any.required': `Name is a required field`
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': `Email must be a valid email`,
                'string.empty': `Email cannot be an empty field`,
                'any.required': `Email is a required field`
            }),
        password: Joi.string()
            .min(6)
            .max(128)
            .required()
            .messages({
                'string.base': `Password should be a type of 'text'`,
                'string.empty': `Password cannot be an empty field`,
                'string.min': `Password should have a minimum length of {#limit}`,
                'string.max': `Password should have a maximum length of {#limit}`,
                'any.required': `Password is a required field`
            }),
        phoneNumber: Joi.string()
            .min(10)
            .max(10)
            .required()
            .messages({
                'string.base': `Phone number should be a type of 'text'`,
                'string.empty': `Phone number cannot be an empty field`,
                'string.min': `Phone number should have a minimum length of {#limit}`,
                'string.max': `Phone number should have a maximum length of {#limit}`,
                'any.required': `Phone number is a required field`
            }),
            role: Joi.string().required(),
            dialCode: Joi.string().required(),
            doctorDetails: Joi.object({
                specialization: Joi.string().required(),
                experience: Joi.string().required(),
                licenseNumber: Joi.string().required(),
            }),
            patientDetails: Joi.object({
                gender: Joi.string().required(),
                age: Joi.number().required(),
                bloodGroup: Joi.string().required(),
                medicalHistory: Joi.array().items(Joi.string().required()).required(),
            }),
            country: Joi.string().required(),
            timeZone: Joi.string().required(),
    })
};

const login = {
    body: Joi.object({  
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}   

const createAppointment ={
    body: Joi.object({  
    doctorId: Joi.string().required(),
    patientId: Joi.string().optional(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required().greater(Joi.ref('startTime')),
    status: Joi.string()
      .valid('Scheduled', 'Completed', 'Cancelled')
      .default('Scheduled')
    
  })

}

const getAppointments = {
    query: Joi.object({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}
const getAppointmentbyId = {
    query: Joi.object({
        userId: Joi.string().required(),
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}



const options = {
    abortEarly: false, 
    allowUnknown: true, 
    stripUnknown: true 
};

module.exports = {
    signUp,
    login,
    createAppointment,
    getAppointments,
    getAppointmentbyId,
    options
};
