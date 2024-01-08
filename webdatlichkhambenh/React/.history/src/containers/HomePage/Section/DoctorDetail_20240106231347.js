import React, { Component } from 'react';

class DoctorDetail extends Component {
    componentDidUpdate() {
        console.log('Props in DoctorDetail:', this.props);

        // Kiểm tra xem selectedDoctor có được thiết lập không
        if (this.props.location && this.props.location.state && this.props.location.state.selectedDoctor) {
            console.log('Selected Doctor in DoctorDetail:', this.props.location.state.selectedDoctor);
        } else {
            console.log('Selected Doctor in DoctorDetail is undefined');
        }
    }

    render() {
        const selectedDoctor = this.props.location && this.props.location.state && this.props.location.state.selectedDoctor;

        console.log('Selected Doctor in DoctorDetail:', selectedDoctor);

        return (
            <div>
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>
                        {/* Thêm các thông tin khác của bác sĩ nếu cần */}
                    </>
                )}
            </div>
        );
    }
}

export default DoctorDetail;
