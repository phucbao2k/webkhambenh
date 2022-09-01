import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(``)
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