import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import { toast } from "react-toastify";
import TableManageClinic from '../TableManageClinic';
//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
const mdParser = new MarkdownIt();

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            address:''

        }

    }


    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({

                imageBase64: base64,
            })
        }
    }
    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new clinic successfully')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: ''
            })
        } else {
            toast.error('Something wrongs...')

        }
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
            //Buffer cung cấp cách xử lý dữ liệu dạng nhị phân, 
            //câu lệnh trên xử lý dữ liệu BLOB (được mã hóa là base64) sang dữ liệu binary 
        }
        this.setState({
            email: user.email,
            password: '????????????????????????????????????????',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        return (
            <>
                <div className="manage-clinic-container">
                    <div className="ms-title">Quản lý phòng khám</div>
                    <div className="add-new-clinic row">
                        <div className="col-6 form-group">
                            <label>Tên phòng khám</label>
                            <input className="form-control" type="text" value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                        </div>
                        <div className="col-6 form-group">
                            <label>Ảnh phòng khám</label>
                            <input className="form-control-file" type="file"
                                onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                        <div className="col-6 form-group">
                            <label>Địa chỉ phòng khám</label>
                            <input className="form-control" type="text" value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                        </div>
                        <div className="col-12">
                            <MdEditor

                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn-save-clinic"
                                onClick={() => this.handleSaveNewClinic()}>
                                Save

                            </button>
                        </div>
                    </div>
                   
                </div>
                <div className="col-12 mb-5">
                    <TableManageClinic 
                        handleEditClinicFromParentKey={this.handleEditClinicFromParent}
                        action={this.state.action} />
                </div>
                
               
            </>
           
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);




