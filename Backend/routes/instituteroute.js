const express = require('express');
const institute = require('../Db/models/InstituteSchema');
const router = express.Router();

router.get('/:instituteCode', async (req, res) => {
  const { instituteCode } = req.params;
  const inst = await institute.findOne({ instituteCode });
  return res.status(200).json(inst.instituteName);
});

module.exports = router;
