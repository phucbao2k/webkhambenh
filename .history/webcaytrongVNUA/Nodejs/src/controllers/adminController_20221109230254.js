import adminService from '../services/adminService';
let handleDeleteBook = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteBook(req.body.id);
    return res.status(200).json(message);
}








let getAllBookingForAdmin = async (req, res) => {
    try {
        let infor = await adminService.getAllBookingForAdmin(req.query.date);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
   
    getAllBookingForAdmin: getAllBookingForAdmin,
   
}