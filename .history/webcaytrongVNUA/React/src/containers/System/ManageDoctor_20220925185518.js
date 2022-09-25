import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {CRUD_ACTIONS, LANGUAGES } from '../../utils';
import './ManageDoctor.scss';
import * as actions from "../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../services/userService';
const mdParser = new MarkdownIt();

const options = [
   
  ];
 // nếu muốn import 1 function thì ta dùng dấu ngoặc nhọn
class ManageDoctor extends Component {
// PROPS stands for properties and is being used for passing data from one component to another.
// But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
   constructor(props) {
    super(props);
    this.state ={
      contentMarkdown: '',
      contentHTML:'',
      //tạo hai biến content này để lưu giá trị kiểu text và lưu gia trị kiểu html
      selectedDoctor: '',
      description: '',
      listDoctors:[]
    }
   }
//để lưu giá trị của 1 biến components, ta dùng state
//Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    
componentDidMount() {
     this.props.fetchAllDoctors()
    }
buildDataInputSelect = (inputData)=>{
    console.log("check input data", inputData)
    //inputData đã được lấy từ componentDidMount() 
    let result =[];
    let {language} = this.props;
    if(inputData && inputData.length>0){
        inputData.map((item, index)=>{
            let object = {};
            let labelEn = `${item.lastName} ${item.firstName}`;
            let labelVi = `${item.firstName} ${item.lastName}`;
            object.label = language ===LANGUAGES.VI ? labelVi: labelEn;
            object.value= item.id;
            result.push(object);
            //options trong react được cấu thành từ 2 phần: Value và label
        })
       
    }
    return result;
}
componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.allDoctors !== this.props.allDoctors){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        this.setState({
            listDoctors: dataSelect
        })
    }
    if(prevProps.language !== this.props.language){
        let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        this.setState({
            listDoctors: dataSelect
        })

    }
}
 handleEditorChange = ({html, text})=>{
    this.setState({
        contentMarkdown: text,
        contentHTML: html,
    })
}

handleSaveContentMarkdown =()=>{
 this.props.saveDetailDoctor({
    contentHTML: this.state.contentHTML,
    contentMarkdown: this.state.contentMarkdown,
    description: this.state.description,
    doctorId: this.state.selectedDoctor.value
    //doctorId: this.state.selectedDoctor.value dùng để gán giá trị item.id cho doctorId rồi lưu vào db
 })
}
handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Doctor selected:`, this.state.selectedDoctor)
    );
  };
  handleOnChangeDesc = (event)=>{
this.setState({
    description: event.target.value
})
  }
    render() {
        
     console.log('check state: ', this.state)
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
        onChange={this.handleChange}
        options={this.state.listDoctors}
     />
</div>
<div className="content-right">
<label>Thông tin giới thiệu:</label>
    <textarea className="form-control" rows="4"
    onChange ={(event)=>this.handleOnChangeDesc(event)}
    value={this.state.description}>
        ...
    </textarea>
    
</div>
                </div>
             </div>
             <div className="manage-doctor-editor">
<MdEditor style ={{height:'500px'}} renderHTML={text=> mdParser.render(text)} onChange={this.handleEditorChange}/>
</div>
            </div>

           <button
           onClick={()=> this.handleSaveContentMarkdown()}
           className="save-content-doctor">Done! Save</button>
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
      fetchAllDoctors:() => dispatch(actions.fetchAllDoctors()),
      saveDetailDoctor:(data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
