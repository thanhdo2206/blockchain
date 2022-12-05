const express = require("express");
const { getAllAgencies,createAgency, deleteAgency } = require("../controllers/agency.controller");
const {authenticate} = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");



const agencyRouter = express.Router();


agencyRouter.get("/",getAllAgencies );
agencyRouter.post("/",authenticate, createAgency);
agencyRouter.delete("/:id",authenticate,deleteAgency);


module.exports = agencyRouter;
