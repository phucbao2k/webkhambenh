import React, { Component } from 'react';

class DoctorDetail extends Component {
    componentDidUpdate(prevProps) {
        console.log('Prev Props in DoctorDetail:', prevProps);
        console.log('Current Props in DoctorDetail:', this.props);
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

                        <h3>Danh sách các bác sĩ</h3>
                        <ul>
                            {selectedDoctor.doctors.map((doctor) => (
                                <li key={doctor.id}>
                                    <p>Bác sĩ #{doctor.doctorId}</p>
                                    <p>Specialty: {doctor.specialtyId}</p>
                                    <p>Clinic: {doctor.clinicId}</p>
                                    {/* Thêm các thông tin khác của bác sĩ nếu cần */}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    }
}

export default DoctorDetail;
