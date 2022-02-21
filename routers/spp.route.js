'use strict' //hanya menjalankan data di file ini saja

const express = require('express')
const sppcontroller = require('../controllers/spp.controller')
const router =  new express.Router();
const {checkToken} = require("../auth/token-admin")

router.get("/", checkToken,sppcontroller.read)
router.post("/", checkToken,sppcontroller.add)
router.get("/:id", checkToken,sppcontroller.get)
router.put("/:id", checkToken,sppcontroller.edit)
router.delete("/:id", checkToken,sppcontroller.delete)


module.exports = router