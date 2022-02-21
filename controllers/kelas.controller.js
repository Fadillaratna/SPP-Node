'use strict'

const db = require('../db')

module.exports = {
    read: (req, res) =>{
        const sql = "select * from kelas"
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menampilkan data",
                data: result
            })
        })
    },

    add: (req, res) =>{
        const nama_kelas = req.body.namakelas
        const jurusan = req.body.jurusan
        const angkatan = req.body.angkatan
        const sql =  `insert into kelas (nama_kelas, jurusan, angkatan) values ('${nama_kelas}','${jurusan}','${angkatan}')`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menambahkan data"
            })
        })
    },

    get: (req, res) =>{
        const id = req.params.id
        const sql =  `select * from kelas where id_kelas = '${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                result
            })
        })
    },

    edit: (req, res) =>{
        const id = req.params.id
        const nama_kelas = req.body.namakelas
        const jurusan = req.body.jurusan
        const angkatan = req.body.angkatan
        const sql = `update kelas set nama_kelas='${nama_kelas}',jurusan='${jurusan}', angkatan='${angkatan}' where id_kelas='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil mengubah data"
            })
        })
    },

    delete: (req, res) =>{
        const id = req.params.id
        const sql = `delete from kelas where id_kelas='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menghapus data"
            })
        })
    }



   

    
}