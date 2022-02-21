'use strict'

const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    read: (req, res) =>{
        const sql = "select * from petugas"
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menampilkan data",
                data: result
            })
        })
    },

    add: (req, res) =>{
        const {
            username,
            password,
            nama_petugas,
            level,
            gender,
            alamat,
            no_tlp

        } = req.body
        if (!nama_petugas, !username, !level, !gender, !alamat, !no_tlp || !password) {
            res.status(402).json({
                message: "username, password, nama petugas, level, gender, alamat, dan tlp harus diisi!"
            })
        }
        return db.query('insert into petugas set ?', {
            username,
            password: hashPassword(password),
            nama_petugas,
            level,
            gender,
            alamat,
            no_tlp
        }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    err
                })
            }
            return res.json({
                message: 'registrasi berhasil',
                data: result
            })
        })
    },

    get: (req, res) =>{
        const id = req.params.id
        const sql =  `select * from petugas where id_petugas = '${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                result
            })
        })
    },
    // `insert into petugas (username, password, nama_petugas, level, gender, alamat, no_tlp) values
    //  ('${username}','${password}','${nama_petugas}', '${level}','${gender}','${alamat}','${tlp}')`

    edit: (req, res) =>{
        const id = req.params.id
        const username = req.body.username
        const password = req.body.password
        const nama_petugas = req.body.nama_petugas
        const level = req.body.level
        const gender = req.body.gender
        const alamat = req.body.alamat
        const tlp = req.body.tlp
        const pw = hashPassword(password)
        const sql = `update petugas set username='${username}',password='${pw}', nama_petugas='${nama_petugas}', level='${level}', gender='${gender}', alamat='${alamat}', no_tlp='${tlp}' where id_petugas='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil mengubah data"
            })
        })
    },

    delete: (req, res) =>{
        const id = req.params.id
        const sql = `delete from petugas where id_petugas='${id}'`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil menghapus data"
            })
        })
    },

    login: (req, res) => {
        const {
            username, 
            password
        } = req.body
        
        if( !username || !password) res.status(402).json({message: "email dan password harus diisi."})

        return db.query('select * from petugas where username = ?', username , (err, result)=>{
            if(err) return res.status(500).json({err})
            const user = result[0]
            if(typeof user === 'undefined'){
                res.status(401).json({message: "user tidak ditemukan"})
            }else{
                if(!bcrypt.compareSync(password, user.password)){
                    res.status(401).json({message: "email atau password tidak sesuai"})
                }else{
                    if(result[0].level === "Admin"){
                        const secret1 = '#$@^%$^%*&%$$@&'
                        const token = jwt.sign({data: user}, secret1)
    
                        return res.json({message: 'Hai, Admin! Login berhasil. silahkan menggunakan token dibawah ini untuk mengakses endpoint private lain', token})
                    }else if(result[0].level === "Petugas"){
                        const secret2 = '$$@^%$^%*&%$$@*'
                        const token = jwt.sign({data: user}, secret2)
    
                        return res.json({message: 'Hai, Petugas! Login berhasil. silahkan menggunakan token dibawah ini untuk mengakses endpoint private lain', token})
                    }

                        
                }
            }
                   
           
        })

    }



   

    
}