import db from "../models/index";
let handleUserLogin = (email, password) =>{

}
let checkUserEmail = (email)=>{
    return new Promise( async(resolve, reject)=>{
        try{
let user = await db.User.find0ne({
    wher
})
        }catch(e){
            reject(e);
        }
    })
}