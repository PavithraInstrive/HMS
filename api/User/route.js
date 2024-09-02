const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');
const c = require('../../system/utils/controller-handler');
const controller = require('./controller');
const schema = require('./schema');
const auth = require("../../system/middleware/auth");


router.post('/signUp',
     celebrate(schema.signUp, schema.options), 
     c(controller.signUp, (req, res, next) => [req]));
/**
 * @swagger
 * /user/signUp:
 *   post:
 *     summary: "Create a user"
 *     description: "User SignUp"
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User SignUp
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: Pavithra Duraisamy
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *             role:
 *               type: string
 *               enum: [Patient, Doctor]
 *             dialCode:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             doctorDetails:
 *               type: object
 *               properties:
 *                 specialization:
 *                   type: string
 *                 experience:
 *                   type: string
 *                 licenseNumber:
 *                   type: string
 *             patientDetails:
 *               type: object
 *               properties:
 *                 gender:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 bloodGroup:
 *                   type: string
 *                 medicalHistory:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       201:
 *         description: User SignUp
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email already exists
 */
router.post('/login',
     celebrate(schema.login, schema.options), 
     c(controller.login, (req, res, next) => [req]));

router.get('/getDoctors',
     auth.authenticate,
     celebrate(schema.getDoctors, schema.options),
     c(controller.getDoctors, (req, res, next) => [req]))    

// router.get('/getPatients',
//      auth.authenticate,
//      c(controller.getDoctors, (req, res, next) => [req])) 


module.exports = router;