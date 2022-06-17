const db=require("../models/index");

async function createUser({ 
    username,
    email,
    password,
    mobile,
    age,
    createdAt,
    updatedAt,
 }) {
   console.log("Inside fun");
  return db.users.create({
    username,
    email,
    password,
    mobile,
    age,
    createdAt:new Date(),
    updatedAt:new Date(),
  });
}

module.exports={createUser};