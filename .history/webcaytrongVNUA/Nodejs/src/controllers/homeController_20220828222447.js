

    export default function getHomePage (req, res){
        return res.render('homepage.ejs');
        }
        export getAboutPage =(req, res)=>{
            return res.render('test/about.ejs');
            }

module.exports ={
    getHomePage:getHomePage,
    getAboutPage:getAboutPage,
   
}
