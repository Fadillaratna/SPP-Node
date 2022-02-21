'use strict' //hanya menjalankan data di file ini saja

const express = require('express')
const siswacontroller = require('../controllers/siswa.controller')
const router =  new express.Router();
const {checkToken} = require("../auth/token-admin")

router.get("/", checkToken,siswacontroller.read)
router.post("/", checkToken,siswacontroller.add)
router.get("/:nisn", checkToken,siswacontroller.get)
router.put("/:nisn", checkToken,siswacontroller.edit)
router.delete("/:nisn", checkToken,siswacontroller.delete)


module.exports = router