const Repair = require('../models/repair.model');
const User = require('../models/repair.model');
const catchAsync = require('../utils/catchAsync');

const findRepairs = catchAsync(async (req, res) => {
    const repairs = await Repair.findAll({
      where: {
        status: true,
      },
    });

   
    res.status(200).json({
      status: 'success',
      message: 'Repair was found successfully',
      repairs,
    });
});

const findRepair = catchAsync(async (req, res) => {
    const { repair } = req;

    res.status(200).json({
      status: 'success',
      message: 'Repair fetched successfully',
      repair,
    });
});

const createRepair = catchAsync(async (req, res, next) => {

  const { date, userId} = req.body;
  const repairs = await Repair.create({
    date,
    userId,
  });
  res.status(201).json({
    status: 'success',
    message: 'Repair created successfully',
    repairs,
  });
});

const updateRepair = catchAsync(async (req, res, next) => {

  const { name } = req.body;
  const { repair} = req;

  await repair.update({ name});
  
  res.status(200).json({
    status: 'success',
    message: 'Repair updated successfully',
  });
});

const deleteRepair = catchAsync(async (req, res, next) => {
  
  const {repair } = req;

  await repair.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Repair deleted successfully',
  });
});

module.exports = {
  findRepair,
  findRepairs,
  createRepair,
  updateRepair,
  deleteRepair,
};
