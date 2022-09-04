import db from "../models/index";
let handleUserLogin = (email, password) =>{

}
let checkUserEmail = (email)=>{
    return new Promise( async(resolve, reject)=>{
        try{
let user = await db.User.find0ne({
    where:{email: userEmail}
})
if
        }catch(e){
            reject(e);
        }
    })
}