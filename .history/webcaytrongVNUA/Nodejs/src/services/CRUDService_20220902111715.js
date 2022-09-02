import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data)=>{
    return new Promise(async(resolve, reject) =>{
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1'? true:false,
               roleId: data.roleId
            })
            resolve("ok!CREATED_NEW_USER")
        }catch(e){
reject(e);
        }
    })
    

}
let hashUserPassword =(password)=>{
    return new Promise( async (resolve, reject)=>{
try{
var hashPassword = await bcrypt.hashSync(password, salt);
resolve(hashPassword);
}catch(e){
    reject(e);
}
    })
}
let getAllUsers =()=>{
    return new Promise( async (resolve, reject)=>{
        try{
let users = db.User.findAll({
    raw: true,
});
resolve(users);
        }catch(e){
            reject(e);
        }
    })
}
let getUserInfoById=(userId)=>{
    return new Promise( async (resolve, reject)=>{
        try{
let user = db.User.findOne({
    where: {id: userId},
    raw: true,
})
if(user){
    resolve(user);
}else{
    resolve([]);
}
        }catch(e){

        }
})
}
let updateUserData = (data)=>{
   return new Promise((resolve, reject)=>{
    try{
        let user = db.findOne({
            where:{id}
        })
await db.User.update({})
    }catch(e){

    }
   })
}
module.exports ={
    createNewUser:createNewUser,
    getAllUsers:getAllUsers,
    getUserInfoById: getUserInfoById,
    updateUserData:updateUserData
}