const auth = require("../system/middleware/auth");
const hms = require('../api/Appointment/route');

const privateRouters = (app) => {
  app.use("/", auth.authenticate);
  app.use('/api/hms', hms);
};

module.exports = privateRouters;
