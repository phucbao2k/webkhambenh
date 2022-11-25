import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './ManageHandbook.scss';
import TableManageHandbook from '../TableManageHandbook';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
const mdParser = new MarkdownIt();
class ManageHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descriptionMarkdown: '',
            descriptionHTML: '',

            handbookArr: [],

            isOpen: false,
            previewImgURL: '',
            name: '',
            handbook: '',
            avatar: '',
            action: '',
            handbookEditId: '',

        };
    }

    async componentDidMount() {


        this.props.getHandbookStart();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.handbookRedux !== this.props.handbookRedux) {
            let arrHandbooks = this.props.handbookRedux;
            this.setState({
                handbookArr: arrHandbooks,
                handbook: arrHandbooks && arrHandbooks.length > 0 ? arrHandbooks[0].keyMap : '',
            })
        }
        if (prevProps.listHandbooks !== this.props.listHandbooks) {
            let arrHandbooks = this.props.handbookRedux;
            this.setState({
                name: '',
                handbook: arrHandbooks && arrHandbooks.length > 0 ? arrHandbooks[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
                descriptionMarkdown: '',
                descriptionHTML: ''
            })
        }
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
    handleSaveHandbook = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewHandbook({
                name: this.state.name,
                avatar: this.state.avatar,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editHandbookRedux({
                id: this.state.handbookEditId,
                name: this.state.name,
                avatar: this.state.avatar,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown
            })
        }


    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'descriptionHTML', 'descriptionMarkdown']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    handleEditHandbookFromParent = (handbook) => {
        let imageBase64 = '';
        if (handbook.image) {
            imageBase64 = new Buffer(handbook.image, 'base64').toString('binary');
            //Buffer cung cấp cách xử lý dữ liệu dạng nhị phân, 
            //câu lệnh trên xử lý dữ liệu BLOB (được mã hóa là base64) sang dữ liệu binary 
        }
        this.setState({
            name: handbook.name,

            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            handbookEditId: handbook.id,
            descriptionHTML: handbook.descriptionHTML,
            descriptionMarkdown: handbook.descriptionMarkdown
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }
    render() {


        let language = this.props.language;
        let { name, avatar, descriptionHTML, descriptionMarkdown } = this.state;
        //đây là cách viết của ES7
        return (

            <div className="user-redux-container" >
                <div className="title">
                    <FormattedMessage id="menu.admin.manage-handbook" />
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {''}
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="validationServerUsername"><FormattedMessage id="menu.admin.common-diseases" /></label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="validationServerUsername" placeholder="..." aria-describedby="inputGroupPrepend3" required
                                        value={name}
                                        onChange={(event) => { this.onChangeInput(event, 'name') }}
                                        // disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} 
                                        />

                                </div>
                            </div>





                        </div>
                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label htmlFor="validationServer02"> <FormattedMessage id="create-user.image" /></label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                    <label className="label-upload" htmlFor="previewImg">Upload<i className="fa-solid fa-upload"></i></label>
                                    <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>


                            </div>

                        </div>



                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required />
                                <label className="form-check-label" htmlFor="invalidCheck3">
                                    <FormattedMessage id="create-user.agree" />
                                </label>
                                <div className="invalid-feedback">
                                    <FormattedMessage id="create-user.confirm" />
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid manage-doctor-editor">
                            <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown} />
                        </div>
                        <div className="col-12 my-3">
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} type="submit"
                                onClick={() => this.handleSaveHandbook()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    <FormattedMessage id="manage-user.edit"></FormattedMessage>
                                    : <FormattedMessage id="manage-user.save"></FormattedMessage>}
                                {/* <FormattedMessage id="create-user.submit"/> */}
                            </button>
                        </div>
                        <div className="col-12 mb-5">
                            <TableManageHandbook
                                handleEditHandbookFromParentKey={this.handleEditHandbookFromParent}
                                action={this.state.action} />
                        </div>

                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })} />}
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listHandbooks: state.admin.handbooks
    };
};
//những cái biến state ở trên hàm mapStateToProps được khai báo trùng với các biến ở trên file này, không cần khai báo ở file
//khác và có thể sử dụng ở file khác, vế trái là ta tự khai báo
const mapDispatchToProps = dispatch => {
    return {
        getHandbookStart: () => dispatch(actions.fetchAllHandbookStart()),
        createNewHandbook: (data) => dispatch(actions.createNewHandbook(data)),
        editHandbookRedux: (data) => dispatch(actions.editHandbook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
