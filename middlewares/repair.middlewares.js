const Repair = require("../models/repair.model");


exports.validRepairById = async(req, res, next) => {
    try{
    const {id} = req.params;
    const repair = await Repair.findOne({
        where: {
          status: true,
          id,
        },
      });
      
      if (!repair) {
        return res.status(404).json({
          status: 'error',
          message: 'Repair not found',
        });
      }

    req.repair = repair;
    next();

} catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
}