import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';


class VNPayPaymentButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        };
    }

    async componentDidMount() {
        this.fetchExtraInfor();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.language !== prevProps.language) {
            this.fetchExtraInfor();
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            this.fetchExtraInfor();
        }
    }

    fetchExtraInfor = async () => {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    };

    apiUrl = 'http://localhost:7070';

    handlePayment = async () => {
        try {
            const { extraInfor } = this.state;
            const language = this.props.language;

            const requestBody = {
                amount: language === LANGUAGES.VI ? extraInfor.priceTypeData?.valueVi : extraInfor.priceTypeData?.valueEn,
                bankCode: 'NCB',
                orderDescription: 'Payment for online appointment booking',
                orderType: 'billpayment',
                language: language,
            };

            console.log('Request Body:', requestBody);

            const response = await fetch(`${this.apiUrl}/order/create_payment_url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log('Full Response:', response);

            const data = await response.json();

            // Chuyển hướng từ phía client
            console.log('Redirecting in 300 seconds...');
            setTimeout(() => {
                window.location.href = data.redirectUrl;
            }, 300000);
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

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

export default connect(mapStateToProps, null)(VNPayPaymentButton);
