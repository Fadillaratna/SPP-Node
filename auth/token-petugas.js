const {verify} = require('jsonwebtoken')
const secret = '$$@^%$^%*&%$$@*'
//,m

module.exports={
    checkTokenn: (req, res, next)=>{
        let token = req.get("authorization")

        if(token){
            let wow = token.slice(7)
            verify(wow,secret,(err,decoded)=>{
                if(err){
                    res.json({
                        succes: 0,
                        message: "you are not logged in or unauthorized user"
                    })
                }else{
                    let user = decoded.result
                    next()
                }
            })
        }else{
            res.json({
                succes: 0,
                message: "Acces Denied : unauthorized user"
            })
        }
    }
}