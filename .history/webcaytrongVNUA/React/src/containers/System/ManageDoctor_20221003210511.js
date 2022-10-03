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
import { hasIn } from 'lodash';
const mdParser = new MarkdownIt();

const options = [

];
// nếu muốn import 1 function thì ta dùng dấu ngoặc nhọn
class ManageDoctor extends Component {
    // PROPS stands for properties and is being used for passing data from one component to another.
    // But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            //tạo hai biến content này để lưu giá trị kiểu text và lưu gia trị kiểu html
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            
        }
    }
    //để lưu giá trị của 1 biến components, ta dùng state
    //Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.

    componentDidMount() {
        this.props.fetchAllDoctors()
        //tất cả dữ liệu lấy được từ fetchAllDoctors sẽ được ghi vào props cha, cụ thể là this.props;
    }
    buildDataInputSelect = (inputData) => {
        console.log("check input data", inputData)
        //inputData đã được lấy từ componentDidMount(), cụ thể là this.props; 
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelEn = `${item.lastName} ${item.firstName}`;
                let labelVi = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
                //options trong react được cấu thành từ 2 phần: Value và label
            })

        }
        return result;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            //allDoctors đã được lấy từ file AdminReducer
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
            //doctorId: this.state.selectedDoctor.value dùng để gán giá trị item.id cho doctorId rồi lưu vào db
        })
    }
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Doctor selected:`, this.state.selectedDoctor)
        );
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
//để lấy thông tin từ bảng markdown rồi in ra màn hình, ta có thể gọi api như trên, rồi dùng hàm setState
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }

    };
    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {

        let { hasOldData } = this.state;
        //khi muốn render ra 1 thứ gì đó trong react, chúng ta phải có hàm return, và trong đó bắt buộc là 1 khối


        return (
            <div className='manage-doctor-container'>
                <div className="users-container">




                    <div className="users-table mt-3 mx-1">
                        <div className="title text-center">Manage Doctors with TaBaoPhuc</div>
                        <div className="more-info">
                            <div className="content-left form-group">

                                <label>Chọn bác sĩ:</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="content-right">
                                <label>Thông tin giới thiệu:</label>
                                <textarea className="form-control" rows="4"
                                    onChange={(event) => this.handleOnChangeDesc(event)}
                                    value={this.state.description}>
                                    ...
                                </textarea>

                            </div>
                        </div>
                    </div>
                    <div className="manage-doctor-editor">
                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />
                    </div>
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span>Save Info</span> : <span>Create Info</span>}</button>
            </div>



        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
