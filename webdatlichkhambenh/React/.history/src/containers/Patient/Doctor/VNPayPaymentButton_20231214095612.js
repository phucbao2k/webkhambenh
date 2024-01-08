import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getDetailInforDoctor } from '../../../services/userService';
import DoctorExtraInfor from './DoctorExtraInfor';
import { LANGUAGES } from '../../../utils';


import _ from 'lodash';
import ProfileDoctor from './ProfileDoctor';
import { connect } from "react-redux";
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
                    orderDescription: 'Payment for something',
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
        let { isOpenModal, closeBookingClose, dataTime, language } = this.props;
        let priceId = '';
        console.log('data Price', dataTime);
        let doctorId = '';

        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
            priceId = dataTime.priceId;
        }
        console.log('baophuc2k check detail doctor: ', this.state)
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }
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
