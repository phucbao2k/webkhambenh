import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class ManageSchedule extends Component {
// PROPS stands for properties and is being used for passing data from one component to another.
// But the important part here is that data with props are being passed in a uni-directional flow. ( one way from parent to child)
  
//để lưu giá trị của 1 biến components, ta dùng state
//Component là một block code độc lập để phân chia các UI (giao diện người dùng) thành các phân nhỏ riêng lẻ để dễ dàng quản lý và tái sử dụng.
    

    render() {
        
    
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
    onChange ={(event)=>this.handleOnChangeDesc(event)}
    value={this.state.description}>
        ...
    </textarea>
    
</div>
                </div>
             </div>
             <div className="manage-doctor-editor">
<MdEditor style ={{height:'500px'}} renderHTML={text=> mdParser.render(text)}
 onChange={this.handleEditorChange}
 value={this.state.contentMarkdown}/>
</div>
            </div>

           <button
           onClick={()=> this.handleSaveContentMarkdown()}
           className={hasOldData === true ?"save-content-doctor":"create-content-doctor" }>
            {hasOldData === true ?
            <span>Save Info</span>: <span>Create Info</span>}</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
