

  
        let getAboutPage =(req, res)=>{
            return res.render('test/about.ejs');
            }

           
            export default function getHomePage(req, res) {
                return res.render('homepage.ejs');
                let getAboutPage = {};
           
                return{
                    getHomePage:getHomePage,
                    getAboutPage:getAboutPage,
                   
                }
                
           };
