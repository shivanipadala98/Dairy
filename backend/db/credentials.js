const db=require('../models/index');
const credentials=require('../models/credentials');

async function createCredentials({
    platform,
    email,
    username,
    password,
    createdAt,
    updatedAt
}){
    return db.credentials.create({
        platform,
        username,
        email,
        password,
        createdAt:new Date(),
        updatedAt:new Date()
    });
}

async function getCredentialss(){
    return db.credentials.findAll();
  }

  async function updateCredentials(platform,username,password,id){
    return db.credentials.update({ 
        platform:platform,
        username:username,
        password:password
     }, {
      where: {
          id:id
      }
    });
  }

  async function deleteCredentials(id){
    return db.credentials.destroy({
      where: {
          id:id
      }
    });
  }

module.exports={createCredentials,getCredentialss,updateCredentials,deleteCredentials};