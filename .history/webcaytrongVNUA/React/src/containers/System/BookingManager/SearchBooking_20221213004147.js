import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageBooking.scss';

import { LANGUAGES, CommonUtils } from '../../../utils';
import LoadingOverLay from "react-loading-overlay";
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
// import Lightbox from 'react-image-lightbox';

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataPatients: null,
            loading: false,
            value: "",
            isOpen: false,
            previewImgURL: '',
            avatar: '',
            isOpenRemedyModal: false,
            isOpenCancelModal: false,
            dataModal: {},
        }

    }

    async componentDidMount() {

        this.search()

    }
  
    search = async phoneNumber => {
        this.setState({ loading: true });
        const results = await search(
            `http://localhost:7070/api/get-search-booking-for-admin-booking?phoneNumber=${phoneNumber}`
        );
        const dataPatients = results;

        this.setState({ dataPatients, loading: false });
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    getrenderMovies() {
        let dataPatients = <h4>Search result is below...</h4>;
        if (this.state.dataPatients) {
            dataPatients = this.state.dataPatients;
        }

        return dataPatients;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
            plantName: item.plantName,
            reasons: item.reasons,
            avatar: item.image,
            phoneNumber: item.phoneNumber
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
            avatar: ''
        })

    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            })
        }
    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleEditUserFromParent = (item) => {
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
            //Buffer cung cấp cách xử lý dữ liệu dạng nhị phân, 
            //câu lệnh trên xử lý dữ liệu BLOB (được mã hóa là base64) sang dữ liệu binary 
        }
        this.setState({

            avatar: '',
            previewImgURL: imageBase64,

        })
    }
    render() {
        let { language } = this.props;
        let { dataPatients } = this.state;
        return (
            <LoadingOverLay active={this.state.isShowLoading}
                spinner
                text='Loading...'>
                <div className="manage-patient-container">
                    <div className="m-p-title"><FormattedMessage id="patient.booking-modal.manage-booking" /></div>

                    <div className="manage-patient-body row">

                        <div className="col-4 form-group">
                            <label><FormattedMessage id="patient.booking-modal.time" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate} />
                        </div>

                        <div className="col-12 table-manage-patient">
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th><FormattedMessage id="patient.booking-modal.numerical-order" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.email" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.time" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.fullName" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.phoneNumber" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.address" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.plantName" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.reason" /></th>
                                        <th><FormattedMessage id="patient.booking-modal.avatar" /></th>
                                        <th>Actions</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            let time = language === LANGUAGES.VI ?
                                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.patientData.email}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.phoneNumber}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{item.plantName}</td>
                                                    <td>{item.reasons}</td>
                                                    <td>   <div className="preview-img-container">
                                                        <input id="previewImg" type="file" hidden
                                                            onChange={(event) => this.handleOnChangeImage(event)} />
                                                        <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                            onClick={() => this.openPreviewImage()}
                                                        >

                                                        </div>
                                                    </div>
                                                    </td>
                                                    <td>
                                                        <button className="mp-btn-confirm"
                                                            onClick={() => this.handleBtnConfirm(item)}><FormattedMessage id="patient.booking-modal.confirm" /></button>
                                                        <button onClick={() => this.handleEditUserFromParent(item)}><FormattedMessage id="patient.booking-modal.check" /></button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                        : <tr>
                                            <td colSpan="6" style={{ textAlign: "center" }}>
                                                no data
                                            </td>
                                        </tr>}
                                </tbody>



                            </table>
                        </div>

                    </div>
                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendSchedule={this.sendSchedule} />

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })} />}

            </LoadingOverLay>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);




