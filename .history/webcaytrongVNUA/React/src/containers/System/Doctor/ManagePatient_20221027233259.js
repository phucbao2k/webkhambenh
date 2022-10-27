import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from "react-toastify";

//lodash hỗ trợ ta kiểm tra và thao tác với mảng dễ dàng hơn
const mdParser = new MarkdownIt();

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
           currentDate: new Date(),
        }

    }


    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
  
   
    handleOnChangeDatePicker = (date) => {
        this.setState({
           currentDate: date[0]
        })
    }

    render() {
        return (
            <div className="manage-patient-container">
                <div className="ms-title">Quản lý chuyên khoa</div>
                <div className="add-new-patient row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên ngành</label>
                        <input className="form-control-file" type="file"
                            onChange={(event) => this.handleOnChangeImage(event)} />
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
                        <button className="btn-save-patient"
                            onClick={() => this.handleSaveNewSpecialty()}>
                            Save

                        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);




