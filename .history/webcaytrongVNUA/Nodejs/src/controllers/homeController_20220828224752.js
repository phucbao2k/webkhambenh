

    export default function getHomePage (req, res){
        return res.render('homepage.ejs');
        }
        let getAboutPage =(req, res)=>{
            return res.render('test/about.ejs');
            }

            return{
                getHomePage:getHomePage,
                getAboutPage:getAboutPage,
               
            }
            let getHomePage = (function() {
                let Menu = {};
           
                return {
                     specialty: "Roasted Beet Burger with Mint Sauce",
                     getSpecialty: function() {
                          return this.specialty;
                      }
                 }
           })();
