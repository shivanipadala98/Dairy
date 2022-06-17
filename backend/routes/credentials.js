const express=require('express');
const router=express.Router();
const db=require('../models/index');
const {body,param,validationResult}=require('express-validator');
const verifyToken=require("../verifyToken/verify");
const bodyParser=require('body-parser');
const jsonParser=bodyParser.json();
const credentialsdb=require('../db/credentials');

const validate=[
    body('platform').isAlpha().withMessage('Platform should be alphabets')
    .notEmpty().withMessage('Platform must be there'),
    body('username').isAlphanumeric().withMessage('User name should be alpha numeric'),
    body('password').notEmpty().withMessage('Platform password must be there')
]
router.post('/create',jsonParser,verifyToken,validate,async(req,res)=>{
    console.log("In func");
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array()});
    }
    else{
        const data={
            platform:req.body.platform,
            username:req.body.username,
            email:req.userDetails.email,
            password:req.body.password
        }
        try{
            await credentialsdb.createCredentials(data).then((response)=>{
                res.status(200).json({message:'Credentials are Added'});
            })
            .catch((error)=>{
                if(error.name=='SequelizeUniqueConstraintError'){
                    res.status(400).json({
                        errors:[{
                            "msg":"Platform already exists",
                            "param":"platform"
                        }]
                    })
                }
                console.log(error.name)
            });
        }
        catch(error){
            res.json({
                error:error.toString()
            })
        }
    }
})

router.get('/view',verifyToken,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array()});
    }
    else{
        try{
            db.credentials.findAll({
                raw:true,
                where:{
                    email:req.userDetails.email
                }
            }).then(entry=>{
                console.log(entry);
                if(entry.length>0){
                    res.json(entry);
                }
                else{
                    res.json({
                        message:'No Entries'
                    })
                }
            })
        }
        catch(error){
            res.json({
                error:error.toString()
            })
        }
    }
})

const updateValidate=[
    body('id').isNumeric().withMessage('Id should br decimal'),
    body('platform').isAlpha().withMessage('Platform should be alphabets')
    .notEmpty().withMessage('Platform must be there'),
    body('username').isAlphanumeric().withMessage('User name should be alpha numeric'),
    body('password').notEmpty().withMessage('Platform password must be there')
]

router.put('/update',jsonParser,verifyToken,updateValidate,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    else{
        const data={
            id:req.body.id,
            platform:req.body.platform,
            username:req.body.username,
            email:req.userDetails.email,
            password:req.body.password
        }
        try{
            db.credentials.findByPk(data.id).then(entry=>{
                if(entry){
                    console.log(entry.toJSON());
                    const entryjson=entry.toJSON();
                    if(entryjson.email==req.userDetails.email){
                        try{
                            const updatedCredentials=credentialsdb.updateCredentials(data.platform,data.username,data.password,data.id)
                            .then((response)=>{
                                res.status(200).json({message:'Credentials Updated'});
                            })
                            .catch((error)=>{
                                if(error.name=='SequelizeUniqueConstraintError'){
                                    res.status(400).json({
                                        errors:[{
                                            "msg":"Platform already exists",
                                            "param":"platform"
                                        }]
                                    })
                                }
                                console.log(error.name)
                            });
                        }
                        catch(error){
                            res.json({
                                error:error.toString()
                            })
                        }
                    }
                    else{
                        res.json({
                            message:"email doesn't exist"
                        })
                    }  
                }
                else{
                    res.json({
                        message:"Id doesn't exist"
                    })
                }
            })
            
        }catch(error){
            res.json({
                error:error.toString()
            })
        }
    }
})

const deletevalidate=[
    param('id').isNumeric().withMessage("Id should be in Numerics"),
]

router.delete('/delete/:id',verifyToken,deletevalidate,async(req,res)=>{
    console.log(req.params.id);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    else{
        try{
            const idCheck=db.credentials.findByPk(req.params.id).then(entry=>{
                if(entry){
                    const deletedCredentials=credentialsdb.deleteCredentials(req.params.id);
                    console.log(req.params.id);
                    res.json(deletedCredentials);
                }
                else{
                    res.json({
                        message:'No entry with this id'
                    })
                }
            })
        }
        catch(error){
            res.json({
                error:error.toString()
            })
        }

    }
})
module.exports=router;