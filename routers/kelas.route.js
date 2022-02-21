'use strict' //hanya menjalankan data di file ini saja

const express = require('express')
const kelascontroller = require('../controllers/kelas.controller')
const router =  new express.Router();
const {checkToken} = require("../auth/token-admin")

router.get("/", checkToken,kelascontroller.read)
router.post("/",  checkToken,kelascontroller.add)
router.get("/:id",  checkToken,kelascontroller.get)
router.put("/:id",  checkToken,kelascontroller.edit)
router.delete("/:id",  checkToken,kelascontroller.delete)


module.exports = router