// QUẢN LÝ THÔNG TIN BÁC SĨ



import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, LANGUAGES } from '../../utils';
import './ManageDoctor.scss';
import * as actions from "../../store/actions";
//import actions ở trên để lấy data
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor,getDetailInforUserNotDoctor } from '../../services/userService';
import { toast } from 'react-toastify';
import { updateDoctorDetails } from '../../store/actions/adminActions.js';
const mdParser = new MarkdownIt();
// nếu muốn import 1 function thì ta dùng dấu ngoặc nhọn
class ManageDoctor extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {
            //Lưu vào bảng markdown
            contentMarkdown: '',
            contentHTML: '',
            //tạo hai biến content này để lưu giá trị kiểu text và lưu gia trị kiểu html
            selectedDoctor: '',
            selectedUserNotDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            listUsersNotDoctor: [],
            //lưu vào bảng doctor_infor
            listPrice: [],
            // listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            // selectedPayment: '',
            selectProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            positionId: '',
            clinicId: '',
            specialtyId: '',
            phoneNumber: '',
            listPosition: [],
            selectedPosition: '',
            action: '',
            newPositionId: '', 
            newPhoneNumber: '', 
            newPositionValueVi: '',
            newPositionValueEn: '',
            valueEn: '',
            valueVi:'',
        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.

    componentDidMount() {
        this.props.fetchAllDoctors()
        //tất cả dữ liệu lấy được từ fetchAllDoctors, getAllRequiredDoctorInfor sẽ được ghi vào props cha, cụ thể là this.props;
        this.props.getAllRequiredDoctorInfor();
        this.props.fetchUserNotDoctor()
        //tất cả dữ liệu lấy được từ fetchAllDoctors, getAllRequiredDoctorInfor sẽ được ghi vào props cha, cụ thể là this.props;
        this.props.getAllRequiredUserNotDoctorInfor();
    }
    buildDataInputSelect = (inputData, type) => {
        console.log("check input data", inputData)
        //inputData đã được lấy từ componentDidMount(), cụ thể là this.props; 
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.lastName} ${item.firstName} `;
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueEn} USD`;
                    let labelVi = `${item.valueVi}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if ( type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueEn}`;
                    let labelVi = ` ${item.valueVi}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'POSITION') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueEn}`;
                    let labelVi = ` ${item.valueVi}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
     
        if (prevProps.allDoctors !== this.props.allDoctors) {
            //allDoctors đã được lấy từ file AdminReducer
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let {  resPrice, resProvince, resSpecialty, resClinic, resPosition } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            // let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            let dataSelectPosition = this.buildDataInputSelect(resPosition, 'POSITION');
            console.log('bao phuc check data new: ', dataSelectPrice, dataSelectProvince,
                dataSelectSpecialty, dataSelectClinic, dataSelectPosition);
            this.setState({
                listPrice: dataSelectPrice,
                listPosition: dataSelectPosition,
                // listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
                
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resProvince, resSpecialty, resClinic, resPosition } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            // let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            let dataSelectPosition = this.buildDataInputSelect(resPosition, 'POSITION');
            this.setState({
                listDoctors: dataSelect,
                listProvince: dataSelectProvince,
                listPrice: dataSelectPrice,
                // listPayment: dataSelectPayment,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
                listPosition: dataSelectPosition
            })

        }
        // if (prevProps.allUsersNotDoctor !== this.props.allUsersNotDoctor) {
        //     //allDoctors đã được lấy từ file AdminReducer
        //     let dataSelect = this.buildDataInputSelect(this.props.allUsersNotDoctor, 'USERS')
        //     this.setState({
        //         listUsersNotDoctor: dataSelect
        //     })
        //     console.log("List Users Not Doctor (in componentDidUpdate):", this.state.listUsersNotDoctor);
        // }
        // if (prevProps.allRequiredUserNotDoctorInfor !== this.props.allRequiredUserNotDoctorInfor) {
        //     let { resPrice, resProvince, resSpecialty, resClinic, resPosition } = this.props.allRequiredUserNotDoctorInfor;
        //     let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
        //     // let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
        //     let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
        //     let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
        //     let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
        //     let dataSelectPosition = this.buildDataInputSelect(resPosition, 'POSITION');
        //     console.log('bao phuc check data user new: ', dataSelectPrice, dataSelectProvince,
        //         dataSelectSpecialty, dataSelectClinic, dataSelectPosition);
        //     this.setState({
        //         listPrice: dataSelectPrice,
        //         // listPayment: dataSelectPayment,
        //         listProvince: dataSelectProvince,
        //         listSpecialty: dataSelectSpecialty,
        //         listClinic: dataSelectClinic,
        //         listPosition: dataSelectPosition
        //     })
        // }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
        //     let { resPrice, resProvince, resSpecialty, resClinic, resPosition } = this.props.allRequiredUserNotDoctorInfor;
        //     let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
        //     // let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
        //     let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
        //     let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
        //     let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
        //     let dataSelectPosition = this.buildDataInputSelect(resPosition, 'POSITION');
        //     this.setState({
        //         listUsersNotDoctor: dataSelect,
        //         listProvince: dataSelectProvince,
        //         listPrice: dataSelectPrice,
        //         // listPayment: dataSelectPayment,
        //         listSpecialty: dataSelectSpecialty,
        //         listClinic: dataSelectClinic,
        //         listPosition: dataSelectPosition

        //     })

        // }
      
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSubmit() {


        //VALIDATE
        var errors = [];
        if (this.state.contentHTML === "") {
            toast.error("Invalid info content input");
            errors.push("contentHTML");
        }
        if (this.state.contentMarkdown === "") {
            toast.error("Invalid info mardown input");
            errors.push("contentMarkdown");
        }
        if (this.state.description === "") {
            toast.error("Invalid description input");
            errors.push("description");
        }
        if (this.state.phoneNumber === "" && this.state.phoneNumber.length > 11) {
            toast.error("Invalid phone number input");
            errors.push("phoneNumber");
        }
        if (this.state.addressClinic === "") {
            toast.error("Invalid address clinic input");
            errors.push("addressClinic");
        }
        if (this.state.nameClinic === "") {
            toast.error("Invalid name clinic input");
            errors.push("nameClinic");
        }
        if (this.state.selectedDoctor === "" ) {
            toast.error("Invalid doctor or user input");
            errors.push("selectedDoctor", "selectedUserNotDoctor");
        }
        // if (this.state.selectedPayment === "") {
        //     toast.error("Invalid payment input");
        //     errors.push("selectedPayment");
        // }
        if (this.state.selectedPrice === "") {
            toast.error("Invalid price input");
            errors.push("selectedPrice");
        }
        if (this.state.selectedSpecialty === "") {
            toast.error("Invalid specialty input");
            errors.push("selectedSpecialty");
        }
        if (this.state.selectProvince === "") {
            toast.error("Invalid province input");
            errors.push("selectProvince");
        }
        if (this.state.selectedClinic === "") {
            toast.error("Invalid clinic input");
            errors.push("selectedClinic");
        }
        if (this.state.selectedPosition === "") {
            toast.error("Invalid clinic input");
            errors.push("selectedPosition");
        }


        this.setState({
            errors: errors
        });

        for (let i = 0; i < errors.length; i++) {
            if (i > 0) {
                toast.error("Error! Please enter valid ")
                break;
            }
        }
        return errors.length;
    }
    handleSaveContentMarkdown = async () => {
        let errors = [];
        console.log('newPositionValueVi:', this.state.newPositionValueVi);
        console.log('newPositionValueEn:', this.state.newPositionValueEn);
        // Lấy giá trị từ state
        const { newPositionId, newPhoneNumber, newPositionValueVi, newPositionValueEn } = this.state;
        errors.length = this.handleSubmit();
        if (errors.length > 0) return;
        let { hasOldData } = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            // selectedPayment: this.state.selectedPayment.value,
            selectProvince: this.state.selectProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            selectedPosition: this.state.selectedPosition.value,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value,
            newPhoneNumber: this.state.phoneNumber,
            newPositionId: this.state.selectedPosition.value,
            newPositionValueVi: newPositionValueVi,
            newPositionValueEn: newPositionValueEn
            //doctorId: this.state.selectedDoctor.value dùng để gán giá trị item.id cho doctorId rồi lưu vào db
        });
        console.log('newPositionId:', this.state.selectedPosition.value);
        console.log('newPhoneNumber:', this.state.phoneNumber);
        console.log('newPositionValueVi:', this.state.newPositionValueVi);
        console.log('newPositionValueEn:', this.state.newPositionValueEn);
        this.props.updateDoctorDetails({ positionId: newPositionId, phoneNumber: newPhoneNumber, positionId: newPositionId, phoneNumber: newPhoneNumber, valueVi: this.state.newPositionValueVi, valueEn: this.state.newPositionValueEn });
    };






    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Doctor selected:`, this.state.selectedDoctor)
        );
        let {  listPrice, listProvince, listSpecialty, listClinic, listPosition } = this.state;
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', positionId = '', 
                priceId = '', provinceId = '', selectedPrice = '',
                selectProvince = '', selectedSpecialty = '', specialtyId = '',
                clinicId = '', selectedClinic = '', phoneNumber = '', selectedPosition = ''
                ;
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                positionId = res.data.Doctor_Infor.positionId;
                phoneNumber = res.data.Doctor_Infor.phoneNumber;
                // paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;
                // selectedPayment = listPayment.find(item => {
                //     return item && item.value === paymentId
                // })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
                selectedPosition = listPosition.find(item => {
                    return item && item.value === positionId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                selectedPosition: selectedPosition,
                // selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectProvince: selectProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                phoneNumber: phoneNumber,
            })
            //để lấy thông tin từ bảng markdown rồi in ra màn hình, ta có thể gọi api như trên, rồi dùng hàm setState
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                selectedPosition: '',
                // selectedPayment: '',
                selectedPrice: '',
                selectProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                phoneNumber: '',
            })
        }

    };
    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        this.setState({
            [stateName]: selectedDoctor,
        });
    }

    handleChangeSelectUserNotDoctor = async (selectedUserNotDoctor) => {
        this.setState({ selectedUserNotDoctor }, () =>
            console.log(`User selected:`, this.state.selectedUserNotDoctor)
        );
        let {  listPrice, listProvince, listSpecialty, listClinic, listPosition } = this.state;
        let res = await getDetailInforUserNotDoctor(selectedUserNotDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', positionId = '',
                priceId = '', provinceId = '', selectedPrice = '',
                selectProvince = '', selectedSpecialty = '', specialtyId = '',
                clinicId = '', selectedClinic = '', phoneNumber = '', selectedPosition = '';
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                positionId = res.data.Doctor_Infor.positionId;
                phoneNumber = res.data.Doctor_Infor.phoneNumber;
                // paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;
                // selectedPayment = listPayment.find(item => {
                //     return item && item.value === paymentId
                // })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
                selectedPosition = listPosition.find(item => {
                    return item && item.value === positionId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                selectedPosition: selectedPosition,
                // selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectProvince: selectProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                phoneNumber: phoneNumber,
            })
            //để lấy thông tin từ bảng markdown rồi in ra màn hình, ta có thể gọi api như trên, rồi dùng hàm setState
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                selectedPosition: '',
                // selectedPayment: '',
                selectedPrice: '',
                selectProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                phoneNumber: '',
            })
        }

    };
    handleChangeSelectUserNotDoctorInfor = async (selectedUserNotDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedUserNotDoctor;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        });
    }
    //thêm id vào để tái tận dụng cho các state khác nhau, chỉ việc thay id = tên state chúng ta muốn ở các component là dùng được.
    render() {
       
        let { hasOldData } = this.state;
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối

        return (
            <div className='manage-doctor-container'>
                <div className="users-container">
                    <div className="users-table mt-3 mx-1">
                        <div className="title text-center">
                            <FormattedMessage id="admin.manage-doctor.title" />
                        </div>
                        <div className=" more-info">
                            <div className="content-left form-group">

                                <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                                />
                            </div>
                            <div className="content-right">
                                <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                                <textarea className="form-control" rows="4"
                                    onChange={(event) => this.handleOnChangeText(event, 'description')}
                                    value={this.state.description}>
                                    ...
                                </textarea>

                            </div>
                        </div>
                        {/* <div className="content-left form-group">
                            <label><FormattedMessage id="admin.manage-doctor.select-user-not-doctor" /></label>
                            <Select
                                value={this.state.selectedUserNotDoctor}
                                onChange={this.handleChangeSelectUserNotDoctor}
                                options={this.state.listUsersNotDoctor}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-user-not-doctor" />}
                            />

                        </div> */}
                        <div className=" more-infor-extra row">
                            <div className="col-4 form-group">
                                <label>Phone Number</label>
                                <input type="number" maxLength="11" className="form-control"
                                    onChange={(event) => this.handleOnChangeText(event, 'phoneNumber')}
                                    value={this.state.phoneNumber}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPrice}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                    name="selectedPrice"
                                />
                            </div>
                            {/* <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPayment}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                    name="selectedPayment"
                                />
                            </div> */}
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                                <Select
                                    value={this.state.selectProvince}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listProvince}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                    name="selectProvince"
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                    value={this.state.nameClinic}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                    value={this.state.addressClinic}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listClinic}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                                    name="selectedClinic"
                                />

                            </div>

                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listSpecialty}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                                    name="selectedSpecialty"
                                />
                            </div>

                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.position" /></label>
                                <Select
                                    value={this.state.selectedPosition}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPosition}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.position" />}
                                    name="selectedPosition"
                                />
                            </div>
                        </div>


                    </div>

                    <div className="container-fluid manage-doctor-editor">
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />
                    </div>
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>}
                </button>
            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        allRequiredUserNotDoctorInfor: state.admin.allRequiredUserNotDoctorInfor,
        allUsersNotDoctor: state.admin.allUsersNotDoctor,
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchUserNotDoctor: () => dispatch(actions.fetchUserNotDoctor()),
        getAllRequiredUserNotDoctorInfor: () => dispatch(actions.getRequiredUserNotDoctorInfor()),
        saveDetailUserNotDoctor: (data) => dispatch(actions.saveDetailUserNotDoctor(data)),
        updateDoctorDetails
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
