

  
        let getAboutPage =(req, res)=>{
            return res.render('test/about.ejs');
            }

           
            export getHomePage = (function() {
                return res.render('homepage.ejs');
                let getAboutPage = {};
           
                return{
                    getHomePage:getHomePage,
                    getAboutPage:getAboutPage,
                   
                }
                
           })();
