const { Router } = require('express');
const {
  createRepair,
  updateRepair,
  deleteRepair,
  findRepairs,
  findRepair,
} = require('../controllers/repairs.controllers');
const { validRepairById } = require('../middlewares/repair.middlewares');

const router = Router();

router.get('/', findRepairs); // esta busca a todas

router.get('/:id',validRepairById, findRepair); // esta sólo busca una 

router.post('/', createRepair);

router.patch('/:id',validRepairById, updateRepair);

router.delete('/:id',validRepairById, deleteRepair);

module.exports = {
  repairsRouter: router,
};
