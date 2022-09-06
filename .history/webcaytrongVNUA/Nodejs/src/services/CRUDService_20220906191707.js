import bcrypt from 'bcryptjs';
import db from '../models/index.js';
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
var hashPassword = bcrypt.hashSync(password, salt);
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
reject(e);
        }
})
}
let updateUserData = (data)=>{
   return new Promise(async (resolve, reject)=>{
    try{
        let user = await db.User.findOne({
            where:{id: data.id}
        })
        if(user){
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allUsers = await db.User.findAll();
            resolve(allUsers);
        }else{
            resolve();
        }

    }catch(e){
reject(e);
    }
   })
}
let deleteUserByID = (userId)=>{
   
let user =  db.User.findOne({
    where: {id: userId}
})
if(user){
    user.destroy({ where: { id: userId } }).then(() => {
        res.status(200).send('Removed Successfully');
       }).catch(err) => {
        res.status(500).json({message: 'Deleting data failed.'});
       
   
}



    }

module.exports ={
    createNewUser:createNewUser,
    getAllUsers:getAllUsers,
     getUserInfoById: getUserInfoById,
    updateUserData:updateUserData,
    deleteUserByID: deleteUserByID,
  
}