

    let getHomePage =(req, res)=>{
        return res.render('homepage.ejs');
        }
        let getAboutPage =(req, res)=>{
            return res.render('test/about.ejs');
            }

           
            let getHomePage = (function() {
                let getAboutPage = {};
           
                return{
                    getHomePage:getHomePage,
                    getAboutPage:getAboutPage,
                   
                }
           })();
