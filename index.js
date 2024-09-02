const dotenv = require('dotenv');

switch (process.env.NODE_ENV) {
    case 'production':
        dotenv.config({ path: './production.env' });
        break;
    case 'staging':
        dotenv.config({ path: './staging.env' });
        break;
    case 'development':
        dotenv.config({ path: './dev.env' });
        break;
    default:
        dotenv.config({ path: './local.env' });
        break;
}


const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const userAgent = require('express-useragent');
const bodyParser = require('body-parser');
const boom = require('@hapi/boom');
const requestIp = require('request-ip');
const logError = require('./system/middleware/log-error');
const errorHandler = require('./system/error/handler');
const cors = require('cors');
// const swaggerSpec = require('./docs');
const middlewareConfig = require('./system/config/middleware');
const publicRouters = require('./routers/publicRouter');
const privateRouters = require('./routers/privateRouter');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerMerge = require('swagger-merge');
const path = require('path');


const corsOptions = {
    origin: ['http://localhost:8080', 'http://your-allowed-origin.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
app.use(cors(corsOptions));
  
app.use(userAgent.express());
app.use(express.json());
// app.use(cors(middlewareConfig.cors));
app.use(helmet());
app.use(morgan(middlewareConfig.morganRequestFormat));
app.use(bodyParser.urlencoded({
    extended: true,
}));
// app.use(bodyParser.json());
app.use(requestIp.mw());

app.get('/', (req, res) => {
    console.log(`Health is A OK .ENV ${process.env.NODE_ENV}`);
    res.send({ msg: `Health is A OK .ENV ${process.env.NODE_ENV}` });
});

// var info = {
//   version: "1.0.0",
//   title: "HMS",
//   description: "all mighty services merged together\n"
// }



const appointmentDocument = YAML.load('./api/Appointment/swagger.yaml');
const userDocument = YAML.load('./api/User/swagger.yaml');

const combinedSwaggerDocument = {
    openapi: '3.0.0',
    info: {
      title: 'HMS',
      version: '1.0.0',
      description: 'API documentation for both Appointment and User modules',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
      },
    ],
    paths: {
      ...appointmentDocument.paths,
      ...userDocument.paths,
    },
  };
  

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerDocument));

// const swaggerDocument = swaggerMerge.merge([appointmentDocument,userDocument],info,'/api','http://localhost:8080');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


publicRouters(app);
privateRouters(app);

app.use((req, res, next) => {
    throw boom.notFound('Endpoint Not Found');
});

app.use(logError);
app.use(errorHandler.token);
app.use(errorHandler.validation);
app.use(errorHandler.all);

module.exports = app;
