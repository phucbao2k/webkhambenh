import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: [],
        };
    }

    componentDidMount() {
        this.fetchDoctorDetails();  // Gọi phương thức fetchDoctorDetails khi component được tạo ra.
    }

    async componentDidUpdate(prevProps) {
        const { match } = this.props;

        // Kiểm tra xem match có tồn tại và có thay đổi hay không
        if (match && match.params.id !== prevProps.match?.params.id) {
            console.log('New doctor Position:', match.params.id);
            this.fetchDoctorDetails();  // Gọi lại phương thức fetchDoctorDetails khi match.params.id thay đổi.
        }
    }

    async fetchDoctorDetails() {
        const { match } = this.props;

        try {
            // Sử dụng API cũ /api/get-doctors-by-position
            const response = await axios.post('http://localhost:7070/api/get-doctors-by-position', {
                searchTerm: match.params.id,
            });

            this.setState({ doctorDetails: response.data });
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    }

    render() {
        const { selectedDoctor } = this.state;

        return (
            <div>
                {selectedDoctor && (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {selectedDoctor.valueVi}</p>
                        <p>Position: {selectedDoctor.valueEn}</p>
                        <p>Danh sách bác sĩ:</p>
                        <ul>
                            {selectedDoctor.doctors.map((doctor) => (
                                <li key={doctor.id}>
                                    {doctor.valueVi} - {doctor.valueEn}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetail));
