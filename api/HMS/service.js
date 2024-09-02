const Appointment = require("./index");
const mongoose = require('mongoose');


const checkExist = async ({doctorId,startTime,endTime}) => {
    
  const existData = await Appointment.findOne({
    doctorId,
    $or: [
      { startTime: { $gte: startTime, $lte: endTime } },
      { endTime: { $gte: startTime, $lte: endTime } },
    ],
  });
  
  return existData;
};

const create = async ({ patientId, doctorId, startTime, endTime }) => {

const appointment = await Appointment.create({
    patientId,
    doctorId,
    startTime,
    endTime,
  });

  return appointment ;
};

const getAppointment = async (params) => {
  const { userId, skip, limit ,page } = params;  

  const pipeline = [
    {
        $match: { doctorId:new mongoose.Types.ObjectId(userId.toString()) },
    },
    {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [{ $skip: parseInt(skip) }, { $limit: parseInt(limit) }],
        },
      },
  ];
  const result = await Appointment.aggregate(pipeline)
  const totalCount = result[0]?.metadata[0]?.totalCount || 0;
  const appointments = result[0]?.data || [];

  return {
    totalCount,
    page,
    limit,
    data: appointments,
  };
};

module.exports = {
  create,
  getAppointment,
  checkExist
};
