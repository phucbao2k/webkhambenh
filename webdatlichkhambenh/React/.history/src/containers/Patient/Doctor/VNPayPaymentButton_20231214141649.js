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
            dataProfile: {}
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

            const amountVi = extraInfor.priceTypeData?.valueVi;
            const amountEn = extraInfor.priceTypeData?.valueEn;

            const amount = language === LANGUAGES.VI ? amountVi : amountEn;

            // Kiểm tra nếu amount không phải là một số hợp lệ
            if (isNaN(amount) || typeof amount !== 'number') {
                console.error('Invalid amount value:', amount);
                // Xử lý hoặc thông báo lỗi tùy vào trường hợp cụ thể của bạn
            } else {
                console.log('Amount:', amount);

                const requestBody = {
                    amount: amount,
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
                window.location.href = data.redirectUrl;
            }
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
