.specialty-container{
    margin: 0 100px;
    display: flex;
    flex-direction: column;
    .specialty-header{
        height: 60px;
        margin-bottom: 30px;
        padding-top: 30px;
        .title-section{
            font-size: 22px;
            font-weight: 600;
        }
        .btn-section{
            float: right;
            padding: 10px 15px;
            border: none;
            outline: none;
            display: block;
            background: #ebebeb;
            color: black;
            cursor: pointer;
            text-transform: uppercase;
            &:hover{
                color: #fff;
                background: #f7d800;
            }
        }
    }
    .specialty-body{
        .specialty-customize{
            .bg-image{
                width: 278px;
                height: 150px;
                background: url('../../../assets/background.jpg');
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                background-color: #eee;
            }
        }
        // .slick-prev{
        //     left: -10px !important;
        //     z-index: 1000 !important;
        //     height: 48px !important;
        //     width: 44px !important;
        //     background: #fff !important;
        //     border: 2px solid #d7d7d7 !important;
          
         
           
           
        //     &:hover{
        //         background: #eceaea !important;
        //     }
        // }
        // .slick-prev:before,
        .slick-next:before{
         font-family: FontAwesome !important;
         color: red !important;
        }
        .slick-next{
            right: 0 !important;
            z-index: 1000 !important;
            height: 48px !important;
            width: 44px !important;
            background: #fff !important;
            border: 2px solid #d7d7d7 !important;
            &:hover{
                background: #eceaea !important;
            }
        }
    }
   
}