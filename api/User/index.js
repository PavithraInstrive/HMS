const { Schema } = require('mongoose');
const { dbConn } = require('../../system/db/mongo');

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['Patient', 'Doctor'],
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    dialCode: {
        type: String,
        required: true,

    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    country:{
    type: String,
    required: true
    },
    timeZone:{
        type: String,
        required: true
    },
    doctorDetails: {
        type: new Schema({
            specialization: String,
            experience: String,
            licenseNumber: String
        }),
        required: function() { return this.role === 'Doctor'; }
    },
    patientDetails: {
        type: new Schema({
            age: Number,
            gender: String,
            bloodGroup: String,
            medicalHistory: [String]
        }),
        required: function() { return this.role === 'Patient'; }
    }
}, {
    timestamps: true
});

const User = dbConn.model('hmsUser', userSchema);
module.exports = User;
