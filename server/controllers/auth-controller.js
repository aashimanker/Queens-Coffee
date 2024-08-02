const Admin = require("../models/admin-model")

const login = async(req,res)=>{
    try{
    const {name,password} = req.body

    const details = await Admin.findOne({name,password})

    if (details) {
        res.status(200).json({
            msg: "Login successful",
            _id: details._id.toString()
        });
    } else {
        res.status(401).json({
            msg: "Invalid credentials"
        });
    }

}
catch(error){
    res.status(500).json({msg:"Error from login",
        err: error.message
    })
}

}

module.exports = {login}