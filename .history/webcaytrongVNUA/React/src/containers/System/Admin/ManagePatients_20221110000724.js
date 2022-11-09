import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { getAllBookingForAdmin } from '../../../services/userService';
import { LANGUAGES, CommonUtils } from '../../../utils';
import RemedyAdminModal from '../Doctor/RemedyAdminModal';
import { toast } from 'react-toastify';
import TableManagePatients from './TableManagePatients';
import LoadingOverLay from "react-loading-overlay";
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn


class ManagePatients extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            isOpen: false,
            previewImgURL: '',
            avatar: ''

        }

    }


    async componentDidMount() {

        this.getDataPatient()

    }
    getDataPatient = async () => {
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getAllBookingForAdmin({

            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        },
            async () => {

                await this.getDataPatient()
            })
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

        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
            avatar: ''
        })

    }
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })

    }
    // sendRemedy = async (dataChild) => {
    //     let { dataModal } = this.state;
    //     this.setState({
    //         isShowLoading: true
    //     })
    //     let res = await postSendRemedy({
    //         email: dataChild.email,
    //         imgBase64: dataChild.imgBase64,
    //         doctorId: dataModal.doctorId,
    //         patientId: dataModal.patientId,
    //         timeType: dataModal.timeType,
    //         language: this.props.language,
    //         patientName: dataModal.patientName,
    //     })
    //     if (res && res.errCode === 0) {
    //         this.setState({
    //             isShowLoading: false
    //         })
    //         toast.success('Send Remedy succeeds');
    //         this.closeRemedyModal();
    //         await this.getDataPatient();
    //     } else {
    //         this.setState({
    //             isShowLoading: false
    //         })
    //         toast.error('Something went wrong...');
    //         console.log('error remdey is:', res)
    //     }
    // }
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
        let { dataPatient, isOpenRemedyModal, dataModal,avatar } = this.state;
        console.log('check data', dataPatient);
        return (
            <>
                <LoadingOverLay active={this.state.isShowLoading}
                    spinner
                    text='Loading...'>
                    <div className="manage-patient-container">
                        <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate} />
                            </div>

                            <div className="col-12 table-manage-patient">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Tên loài cây</th>
                                            <th>Lý do từ khách hàng</th>
                                            <th>Ảnh từ khách hàng</th>
                                            <th>Actions</th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.plantName}</td>
                                                        <td>{item.reasons}</td>
                                                        <td>   <div className="preview-img-container">
                                                            <input id="previewImg" type="file" hidden
                                                                onChange={(event) => this.handleOnChangeImage(event)} />
                                                            <label className="label-upload" htmlFor="previewImg">Upload<i className="fa-solid fa-upload"></i></label>
                                                            <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                                onClick={() => this.openPreviewImage()}
                                                            >

                                                            </div>
                                                        </div>
                                                        </td>
                                                        <td>
                                                            <button className="mp-btn-confirm"
                                                                onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>

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
                    {/* <div className="col-12 mb-5">
                        <TableManagePatients
                            handleEditUserFromParentKey={this.handleEditUserFromParent}
                            action={this.state.action} />
                    </div> */}
                    <RemedyAdminModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy} />
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })} />}

                </LoadingOverLay>


            </>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatients);




