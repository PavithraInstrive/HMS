openapi: 3.0.0
info:
  title: HMS
  version: 1.0.0
servers:
  - url: http://localhost:8080
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
security:
  - bearerAuth: []
paths:
  /api/user/signup:
    post:
      tags:
        - default
      summary: signUp
      requestBody:
        content:
          application/json:
            schema:
              type: object
              example:  \"name\":\"senti\",\r\n    \"role\":\"Patient\",\r\n    \"email\":\"geetha@gmail.com\",\r\n    \"phoneNumber\":\"9672967596\",\r\n    \"dialCode\":\"+91\",\r\n    \"password\":\"geetha@123\",\r\n    // \"doctorDetails\":{\r\n    //     \"specialization\":\"test\",\r\n    //     \"experience\":\"5 years\",\r\n    //     \"licenseNumber\":\"123456\"\r\n    // },\r\n    \"patientDetails\":{\r\n        \"age\":26,\r\n        \"gender\":\"male\",\r\n        \"bloodGroup\":\"O+ve\",\r\n        \"medicalHistory\":[\"fever\"]\r\n    },\r\n    \"country\":\"IND\",\r\n    \"timeZone\":\"Asia/Tokyo\"\r\n}"
      responses:
        '200':
          description: Successful response
          content:
            application/json: {}
  /api/user/login:
    post:
      tags:
        - default
      summary: signIn
      requestBody:
        content:
          application/json:
            schema:
              type: object
              example:
                email: priyga@gmail.com
                password: priya@123
      responses:
        '200':
          description: Successful response
          content:
            application/json: {}
  /api/user/getDoctors:
    get:
      tags:
        - default
      summary: Doctor List
      parameters:
        - name: role
          in: query
          schema:
            type: string
          example: Doctor
        - name: page
          in: query
          schema:
            type: integer
          example: '1'
        - name: limit
          in: query
          schema:
            type: integer
          example: '10'
      responses:
        '200':
          description: Successful response
          content:
            application/json: {}
  /api/user/getPatients:
    get:
      tags:
        - default
      summary: Patient List
      parameters:
        - name: role
          in: query
          schema:
            type: string
          example: Patient
        - name: page
          in: query
          schema:
            type: integer
          example: '2'
        - name: limit
          in: query
          schema:
            type: integer
          example: '2'
      responses:
        '200':
          description: Successful response
          content:
            application/json: {}
  /api/hms/createAppointment:
    post:
      tags:
        - default
      summary: Create Appointment
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                doctorId:
                  type: string
                  in: body
                  example: "66d00559ce394e410cf2871b"
                startTime:
                  type: string
                  in: body
                  format: date-time
                  example: "2024-08-31T01:30:33.098+05:30"
                endTime:
                  type: string
                  in: body
                  format: date-time
                  example: "2024-08-31T02:30:33.098+05:30"
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  data:
                    type: object
                    properties:
                      doctorId:
                        type: string
                      patientId:
                        type: string
                      startTime:
                        type: string
                        format: date-time
                      endTime:
                        type: string
                        format: date-time
                      status:
                        type: string
                      _id:
                        type: string
                      createdAt:
                        type: string
                        format: date-time
                      updatedAt:
                        type: string
                        format: date-time
                      __v:
                        type: integer
              example:
                message: "Appointment created successfully"
                data:
                  doctorId: "66d00559ce394e410cf2871b"
                  patientId: "66cff9b004fb2e567d143625"
                  startTime: "2024-09-04T07:25:00.000Z"
                  endTime: "2024-09-04T08:30:00.000Z"
                  status: "Scheduled"
                  _id: "66d170bcf6c9f9a9f2bfdbb7"
                  createdAt: "2024-08-30T07:11:56.999Z"
                  updatedAt: "2024-08-30T07:11:56.999Z"
                  __v: 0
        '400':
          description: Bad Request
          content:
            application/json:
              schema:
                type: object
                properties:
                  statusCode:
                    type: integer
                  error:
                    type: string
                  message:
                    type: string
              example:
                statusCode: 400
                error: "Bad Request"
                message: "Invalid Token"          
  /api/hms/getAppointments:
    get:
      tags:
        - default
      summary: get Appointments
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
          example: '2'
        - name: page
          in: query
          schema:
            type: integer
          example: '2'
      responses:
        '200':
          description: Successful response
          content:
            application/json: {}
  /api/hms/getAppointmentbyId:
    get:
      tags:
        - default
      summary: get Appointment By Id
      parameters:
        - name: userId
          in: query
          schema:
            type: string
          example: 66cff9b004fb2e567d143625
        - name: page
          in: query
          schema:
            type: integer
          example: '2'
        - name: limit
          in: query
          schema:
            type: integer
          example: '2'
      responses:
        '200':
          description: Successful response
          content:
            application/json: {}
