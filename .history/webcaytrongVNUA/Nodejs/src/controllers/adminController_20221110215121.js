import adminService from '../services/adminService';
let handleDeleteBooking = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteBooking(req.body.id);
    return res.status(200).json(message);
}
let handleGetAllBookings = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            bookings: []
        })
    }
    let bookings = await adminService.getAllBookings(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        bookings
    })
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
    handleDeleteBooking: handleDeleteBooking
   
}