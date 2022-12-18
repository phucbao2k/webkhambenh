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
import { getDetailInforDoctor } from '../../services/userService';
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
            description: '',
            listDoctors: [],
            hasOldData: false,

            //lưu vào bảng doctor_infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectProvince: '',
            selectedClinic: '', 
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
            phoneNumber: '',

        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.

    componentDidMount() {
        this.props.fetchAllDoctors()
        //tất cả dữ liệu lấy được từ fetchAllDoctors, getAllRequiredDoctorInfor sẽ được ghi vào props cha, cụ thể là this.props;
        this.props.getAllRequiredDoctorInfor();
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
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelEn = `${item.valueEn}`;
                    let labelVi = ` ${item.valueVi }`;
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
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            console.log('bao phuc check data new: ', dataSelectPrice, dataSelectPayment, dataSelectProvince,
                dataSelectSpecialty, dataSelectClinic);
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            this.setState({
                listDoctors: dataSelect,
                listProvince: dataSelectProvince,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic

            })

        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectProvince: this.state.selectProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId:  this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value,
phoneNumber: this.state.phoneNumber
            //doctorId: this.state.selectedDoctor.value dùng để gán giá trị item.id cho doctorId rồi lưu vào db
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Doctor selected:`, this.state.selectedDoctor)
        );
        let {listPayment,listPrice,listProvince, listSpecialty, listClinic} = this.state;
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note='',paymentId = '',
            priceId = '', provinceId = '',selectedPayment='', selectedPrice = '',
             selectProvince='', selectedSpecialty='', specialtyId='',
             clinicId='', selectedClinic = '', phoneNumber = '';
            if(res.data.Doctor_Infor){
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                phoneNumber = res.data.Doctor_Infor.phoneNumber;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value ===paymentId
                })
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
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
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
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',
                phoneNumber:'',
            })
        }

    };
    handleChangeSelectDoctorInfor = async (selectedDoctor, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedDoctor;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
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
                        <div className=" more-infor-extra row">
                            <div className="col-4 form-group">
                                <label>Phone Number</label>
                                <input className="form-control"
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
                            <div className="col-4 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangeSelectDoctorInfor}
                                    options={this.state.listPayment}
                                    placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                    name="selectedPayment"
                                />
                            </div>
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
                                    onChange={(event)=> this.handleOnChangeText(event, 'nameClinic')}
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

                            
                        </div>
                        <div className="row">
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
                           
                            <div className="col-8 form-group">
                                <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeText(event, 'note')}
                                    value={this.state.note}
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
                        </span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>}</button>
            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
