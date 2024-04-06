const jwt = require('jsonwebtoken');


const Fetchuser = async(req, res, next)=>{
    try{
        //get token from header
        const token = req.header('token');
        if(!token){
            return res.status(400).json({error:"Please try with valid token"})
        }

        //get data from token
        const data = jwt.verify(token, process.env.JWT_SECRET);
        user = data.user;
        next();
    } 
    catch(error){
        return res.status(400).json({error});
    }
}

module.exports = Fetchuser;