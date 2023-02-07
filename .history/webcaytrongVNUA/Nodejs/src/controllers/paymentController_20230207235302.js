
let postPayment = async (req, res) => {
    let message = await paymentService.postNewPayment(req.body);
    console.log(message);
    return res.send('post');

}
export default {
    postPayment: postPayment
}