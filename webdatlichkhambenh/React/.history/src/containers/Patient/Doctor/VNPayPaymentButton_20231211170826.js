import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class VNPayPaymentButton extends Component {
    // Đặt đường dẫn tùy thuộc vào môi trường ở đây
   // apiUrl = 'https://datlichkham.onrender.com';  //  Đường dẫn triển khai
    apiUrl = 'http://localhost:7070'; // Đường dẫn phát triển

    handlePayment = async () => {
        try {
            const response = await fetch(`${this.apiUrl}/create_payment_url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 1000,
                    bankCode: 'NCB',
                    orderDescription: 'Payment for something',
                    orderType: 'billpayment',
                    language: 'vn',
                }),
            });

            const data = await response.json();
            window.location.href = data.payUrl;
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
