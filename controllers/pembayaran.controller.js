'use strict'

const db = require('../db')
const moment = require('moment');

module.exports = {
    // read: (req, res) =>{
    //     const sql = "select * from pembayaran "
    //     db.query(sql, (err, result) =>{
    //         if(err) throw err
    //         res.json({
    //             message: "Berhasil menampilkan data",
    //             data: result
    //         })
    //     })
    // },

    add: (req, res) => {
        var id_petugas = req.body.id_petugas
        var nisn = req.body.nisn
        var ket = 'lunas'

        var now = new Date();
        var bulan_spp = req.body.bulan
        var tahun_spp = req.body.tahun

        var today = moment(now).format('YYYY-MM-DD');

        db.query(`select * from kelas join siswa  on siswa.id_kelas = kelas.id_kelas where nisn = '${nisn}'`, (err, result) => {
            if (err) {
                throw err
            } else {
                var angkatan = result[0].angkatan

                db.query(`select * from spp where angkatan='${angkatan}'`, (err, hasil) => {
                    if (err) {
                        throw err
                    } else {
                        let idspp = hasil[0].id_spp
                        db.query(`select * from pembayaran where nisn = '${nisn}' ORDER BY tahun_spp DESC, bulan_spp DESC`, (err, results) => {
                            if (results.length == 0) {
                                if (bulan_spp && tahun_spp) {
                                    var sql = `insert into pembayaran (id_petugas, nisn, tgl_bayar, bulan_spp, tahun_spp, id_spp, keterangan) values ('${id_petugas}','${nisn}','${today}','${bulan_spp}','${tahun_spp}', '${idspp}','${ket}' )`
                                    db.query(sql, (err, hsl) => {
                                        if (err) throw err
                                        res.json({
                                            message: "Berhasil menambahkan data pembayaran spp",
                                            bulan_spp: bulan_spp,
                                            tahun_spp: tahun_spp,
                                            tanggalPembayaran: today
                                        })
                                    })
                                }
                            } else {
                                var bulanSpp = results[0].bulan_spp;
                                var tahunSpp = results[0].tahun_spp;
                                var bulanspp = 1;
                                if (bulanSpp < 12) {
                                    bulanspp = bulanSpp + 1;
                                }
                                if (bulanSpp >= 12) {
                                    tahunSpp = tahunSpp + 1;
                                }
                                var qry = `insert into pembayaran (id_petugas, nisn, tgl_bayar, bulan_spp, tahun_spp, id_spp, keterangan) values ('${id_petugas}','${nisn}','${today}','${bulanspp}','${tahunSpp}', '${idspp}','${ket}' )`
                                db.query(qry, (err, hsl) => {
                                    if (err) throw err
                                    res.json({
                                        message: "Berhasil menambahkan data pembayaran spp",
                                        bulan_spp: bulanspp,
                                        tahun_spp: tahunSpp,
                                        tanggalPembayaran: today
                                    })
                                    
                                })
                            }

                        })
                    }
                })
            }

        })




    },

    //Cek berdasarkan nisn
    get: (req, res) => {
        const nisn = req.params.nisn
        const sql = `select * from siswa join kelas on kelas.id_kelas = siswa.id_kelas join pembayaran on siswa.nisn = pembayaran.nisn join spp on spp.id_spp = pembayaran.id_spp join petugas on petugas.id_petugas = pembayaran.id_petugas where siswa.nisn = '${nisn}' ORDER by pembayaran.tahun_spp ASC, pembayaran.bulan_spp ASC`
        db.query(sql, (err, rs) => {
            if (err) throw err
            res.json({
                message: "Berhasil menampilkan data pembayaran spp",
                data: rs
            })
        })
    },

    // month: (req, res) =>{
    //     const nisn = req.params.nisn
    //     const sql = `select * from pembayaran where '`
    //     db.query(sql, (err, result) =>{
    //         if(err) throw err
    //         res.json({
    //             message: "Berhasil mengubah data"
    //         })
    //     })
    // },

    // delete: (req, res) =>{
    //     const id = req.params.id
    //     const sql = `delete from spp where id_spp='${id}'`
    //     db.query(sql, (err, result) =>{
    //         if(err) throw err
    //         res.json({
    //             message: "Berhasil menghapus data"
    //         })
    //     })
    // }

}