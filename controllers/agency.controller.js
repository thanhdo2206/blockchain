const { Agency } = require("../models/index");

const getAllAgencies = async (req, res) => {
  try {
    const listAgencies = await Agency.findAll();
    res.status(200).send(listAgencies);
  } catch (error) {
    res.status(500).send(error);
  }
};


const createAgency = async (req, res) => {
  const { agency_name,address } = req.body;
  try {
    const newAgency = await Agency.create({ agency_name,address });
    res.status(201).send(newAgency);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteAgency = async (req, res) => {
    try {
      const { id } = req.params;
      await Agency.destroy({ where: { id } });
  
      res.status(200).send("Delete Agency successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };

module.exports = {getAllAgencies,createAgency, deleteAgency};
