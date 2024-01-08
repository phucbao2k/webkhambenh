// DoctorDetail.js
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class DoctorDetail extends Component {
    componentDidUpdate() {
        console.log('Props in DoctorDetail:', this.props);

        const selectedDoctor = this.props?.location?.state?.selectedDoctor;

        console.log('Selected Doctor in DoctorDetail:', selectedDoctor);
    }

    render() {
        const selectedDoctor =
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.selectedDoctor;

        console.log('Selected Doctor in DoctorDetail:', selectedDoctor);

        return (
            <div>
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>
                        <h3>Danh sách tìm kiếm được</h3>
                        <ul>
                            {selectedDoctor.doctors.map((doctor, index) => (
                                <li key={index}>
                                    <p>Địa chỉ: {doctor.addressClinic}</p>
                                    <p>Địa chỉ cơ sở Y tế: {doctor.addressClinic}</p>
                                    <p>Số điện thoại: {doctor.nameClinic}</p>
                                    
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    }

}

export default withRouter(DoctorDetail);
