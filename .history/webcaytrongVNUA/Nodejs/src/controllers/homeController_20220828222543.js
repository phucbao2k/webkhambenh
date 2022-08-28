

    export default function getHomePage (req, res){
        return res.render('homepage.ejs');
        }
        

module.exports ={
    getHomePage:getHomePage,
    getAboutPage:getAboutPage,
   
}
