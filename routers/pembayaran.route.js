'use strict' //hanya menjalankan data di file ini saja

const express = require('express');
const pembayaranController = require('../controllers/pembayaran.controller');

const router =  new express.Router();
const {checkToken} = require("../auth/token-admin")
const {checkTokenn} = require("../auth/token-petugas")

router.post("/", checkToken,pembayaranController.add)
router.post("/tambah", checkTokenn,pembayaranController.add)

router.get("/:nisn", pembayaranController.get)



module.exports = router