import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
class VNPayPaymentButton extends Component {

    apiUrl = 'http://localhost:7070';
   
    handlePayment = async () => {
        try {
            const response = await fetch(`${this.apiUrl}/order/create_payment_url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: '300000',
                    bankCode: 'NCB',
                    orderDescription: 'Payment for online appointment booking',
                    orderType: 'billpayment',
                    language: 'vn',
                }),
            });

            console.log('Full Response:', response);

            const data = await response.json();

            // Chuyển hướng từ phía client
            window.location.href = data.redirectUrl;
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };


    render() {
       
        return (
            <div className="pay-now">
                <button onClick={this.handlePayment}>
                    <FormattedMessage id="patient.extra-infor-doctor.pay" />
                </button>
            </div>
        );
    }
}

export default VNPayPaymentButton;
