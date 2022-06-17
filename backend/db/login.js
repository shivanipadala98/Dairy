const db=require("../models/index");
const users=require("../models/users");

async function checkUser(email,password){
    const data= db.users.findAndCountAll({
        where:{
            email
        }
    })
    console.log(data);
    return data;
}

module.exports={checkUser};