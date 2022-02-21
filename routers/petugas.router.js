'use strict' //hanya menjalankan data di file ini saja

const express = require('express')
const petugascontroller = require('../controllers/petugas.controller')
const router =  new express.Router();
const {checkToken} = require("../auth/token-admin")

router.get("/", checkToken,petugascontroller.read)
router.get("/:id", checkToken,petugascontroller.get)
router.put("/:id", checkToken,petugascontroller.edit)
router.delete("/:id", checkToken,petugascontroller.delete)

router.post("/", checkToken,petugascontroller.add)
router.post("/login", petugascontroller.login)


module.exports = router