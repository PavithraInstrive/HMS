/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');
const c = require('../../system/utils/controller-handler');
const controller = require('./controller');
const schema = require('./schema');


router.post('/createAppointment',
     celebrate(schema.createAppointment, schema.options),
     c(controller.createAppointment, (req, res, next) => [req]))

router.get('/getAppointments',
     celebrate(schema.getAppointments, schema.options),
     c(controller.getAppointments, (req, res, next) => [req]))

router.get('/getAppointmentbyId',
     celebrate(schema.getAppointmentbyId, schema.options),
     c(controller.getAppointmentbyId, (req, res, next) => [req]))


module.exports = router;