

    let getHomePage =(req, res)=>{
        return res.render('homepage.ejs');
        }
        let getAboutPage =(req, res)=>{
            return res.render('test/about.ejs');
            }

exports ={
    homeController:getHomePage,
    homeController:getAboutPage,
}