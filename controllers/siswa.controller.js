'use strict'

const { NEWDATE } = require('mysql/lib/protocol/constants/types')
const db = require('../db')

module.exports = {
    read: (req, res) =>{
        const sql = "select * from siswa join kelas  on siswa.id_kelas = kelas.id_kelas"
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menampilkan data",
                result

            })
        })
    },

    add: (req, res) =>{
        const nisn = req.body.nisn
        const nis = req.body.nis
        const nama = req.body.nama
        const id_kelas = req.body.id_kelas
        const alamat = req.body.alamat
        const tlp = req.body.tlp
        const username = req.body.username
        const password = req.body.password
        const gender = req.body.gender
        const level = req.body.level
        const sql =  `insert into siswa (nisn, nis, nama, id_kelas, alamat, no_tlp, username, password, gender, level) values ('${nisn}','${nis}','${nama}', '${id_kelas}','${alamat}','${tlp}','${username}','${password}','${gender}','${level}')`
        db.query(sql, (err, result) =>{
            if(err){
                throw err
            }else{
                res.json({
                    message: "Berhasil menambahkan data"
                })
                
            }
        })
    },

    get: (req, res) =>{
        const nisn = req.params.nisn
        const sql =  `select * from siswa join kelas  on siswa.id_kelas = kelas.id_kelas where nisn = '${nisn}'`
        
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menampilkan data siswa",
                nisn: result[0].nisn,
                nis: result[0].nis,
                nama: result[0].nama,
                id_kelas: result[0].id_kelas,
                nama_kelas: result[0].nama_kelas,
                jurusan: result[0].jurusan,
                angkatan: result[0].angkatan,
                alamat: result[0].alamat,
                no_tlp: result[0].no_tlp,
                gender: result[0].gender,
                level: result[0].level

            })
        })
    },


    edit: (req, res) =>{
        const nisn = req.params.nisn
        const nisn1 = req.body.nisn
        const nis = req.body.nis
        const nama = req.body.nama
        const id_kelas = req.body.id_kelas
        const alamat = req.body.alamat
        const tlp = req.body.tlp
        const username = req.body.username
        const password = req.body.password
        const gender = req.body.gender
        const level = req.body.level
        const sql = `update siswa set nisn='${nisn1}',nis='${nis}', nama='${nama}', id_kelas='${id_kelas}', gender='${gender}', alamat='${alamat}', no_tlp='${tlp}', username='${username}', password='${password}', level='${level}' where nisn='${nisn}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil mengubah data"
            })
        })
    },

    delete: (req, res) =>{
        const nisn = req.params.nisn
        const sql = `delete from siswa where nisn='${nisn}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menghapus data"
            })
        })
    }



   

    
}