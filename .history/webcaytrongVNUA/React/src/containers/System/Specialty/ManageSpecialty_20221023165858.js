import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from "react-toastify";

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

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
    handleSaveNewSpecialty = async() => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0){
            toast.success('Add new specialty successfully')
        }else{
            toast.error('Something wrongs...')

        }
    }

    render() {
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input className="form-control" type="text" value={this.state.name}
                        onChange={(event) => this.handleOnChangeInput(event, 'name')}/>
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên ngành</label>
                        <input className="form-control-file" type="file" 
                            onChange={(event) => this.handleOnChangeImage(event)} />
                    </div>
                    <div className="col-12">
                       <MdEditor
                       style={{height: '300'}}/>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);




