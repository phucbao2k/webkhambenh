import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data)=>{
    return new Promise(async(resolve, reject) =>{
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt.STRING,
                firstName: DataTypes.STRING,
                lastName: DataTypes.STRING,
                address: DataTypes.STRING,
                phoneNumber: DataTypes.TEXT,
                gender: DataTypes.BOOLEAN,
               image: DataTypes.STRING,
               roleId: DataTypes.STRING,
               positionId: DataTypes.STRING
            })
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
module.exports ={
    createNewUser:createNewUser,
}