import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(`1`)
let createNewUser = (data)=>{
console.log(data);
console.log('hehe');
}
let hashUserPasswod =(password)=>{
    return new Promise((resolve, reject)=>{

    })
}
module.exports ={
    createNewUser:createNewUser,
}