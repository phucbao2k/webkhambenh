import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getDetailInforDoctor } from '../../../services/userService';
import DoctorExtraInfor from './DoctorExtraInfor';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
class VNPayPaymentButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
            detailPrice: {},
            priceId: ''
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            //nếu props này match với database ở trong api, và match vs db có tham số, và match vs tham số tồn tại ở db đó(id)
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);

            if (res && res.errCode === 0) {
                let priceId = ''
                let detailPrice = res.data;
                if (detailPrice && detailPrice.Doctor_Infor && detailPrice.Doctor_Infor.priceId) {
                    priceId = detailPrice.Doctor_Infor.priceId;
                }
                this.setState({
                    detailDoctor: res.data,
                    priceId: detailPrice.Doctor_Infor.priceId,
                })
                console.log(res.data);

            }

        }
    }
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
        console.log('baophuc2k check detail doctor: ', this.state)
        let { language } = this.props;
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
