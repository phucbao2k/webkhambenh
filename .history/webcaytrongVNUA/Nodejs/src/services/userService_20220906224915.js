import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let hashUserPassword =(password) =>{
return new Promise(async(resolve,reject)=>{
    try{
let hashPassword = await bcrypt.hashSync(password, salt);
resolve(hashPassword);
    }catch(e){
reject(e);
    }
})
}
let handleUserLogin = (email, password) =>{
return new Promise(async(resolve, reject) =>{
    try{
        let userData ={};
let isExist  = await checkUserEmail(email);

if(isExist){
    let user = await db.User.findOne({
        attributes: ['email', 'roleId','password'],
        where: {email: email},
       raw:true,
        
    });
    if(user){
let check = await bcrypt.compareSync(password, user.password);
if(check){
    userData.errCode =0;
    userData.errMessage ='ok';
  
    delete user.password;
    userData.user = user;
}else{
    userData.errCode = 3;
    userData.errMessage= 'Wrong password';
}
    }else{
        userData.errCode =2;
        userData.errMessage ='User not found';
    }

}else{
userData.errCode =1;
userData.errMessage = "Your's email isn't exist in our system."
}
resolve(userData);
    }catch(e){
        reject(e);
    }
})
}

let checkUserEmail = (userEmail)=>{
    return new Promise( async(resolve, reject)=>{
        try{
let user = await db.User.findOne({
    where:{email: userEmail}
})
if(user){
    resolve(true);
}else{
    resolve(false);
}
        }catch(e){
            reject(e);
        }
    })
}
let getAllUsers = (userId) =>{
    return new Promise(async(resolve, reject)=>{
        try{
let users = '';
if(userId ==='ALL'){
    users = await db.User.findAll({
        attributes:{
            exclude:['password']
        }
    })
}
if(userId && userId !== 'ALL'){
    users = await db.User.findOne({
        where:{id: userId},
        attributes:{
            exclude:['password']
        }
    })
}
resolve(users)
//resolve để thoát ra khỏi Promise 
        }catch(e){
reject(e);
        }
    })
}
let createNewUser =(data)=>{
    return new Promise(async (resolve, reject)=>{
        try{
let check = await checkUserEmail(data.email);
if(check === true){
    resolve({
        errCode: 1,
        message: 'Your'
    })
}
        }catch(e){

        }
    })
}
module.exports ={
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
}