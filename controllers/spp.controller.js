'use strict'

const db = require('../db')

module.exports = {
    read: (req, res) =>{
        const sql = "select * from spp"
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menampilkan data",
                data: result
            })
        })
    },

    add: (req, res) =>{
        const angkatan = req.body.angkatan
        const tahun = req.body.tahun
        const nominal = req.body.nominal
        const sql =  `insert into spp (angkatan, tahun, nominal) values ('${angkatan}','${tahun}','${nominal}')`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menambahkan data"
            })
        })
    },

    get: (req, res) =>{
        const id = req.params.id
        const sql =  `select * from spp where id_spp = '${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                result
            })
        })
    },

    edit: (req, res) =>{
        const id = req.params.id
        const angkatan = req.body.angkatan
        const tahun = req.body.tahun
        const nominal = req.body.nominal
        const sql = `update spp set angkatan='${angkatan}',tahun='${tahun}', nominal='${nominal}' where id_spp='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil mengubah data"
            })
        })
    },

    delete: (req, res) =>{
        const id = req.params.id
        const sql = `delete from spp where id_spp='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menghapus data"
            })
        })
    }

}