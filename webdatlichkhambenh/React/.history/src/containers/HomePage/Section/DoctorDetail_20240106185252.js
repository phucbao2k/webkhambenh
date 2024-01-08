import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorDetails: null,
        };
    }

    componentDidMount() {
        this.fetchDoctorDetails();
    }

    async componentDidUpdate(prevProps) {
        const { match } = this.props;

        if (match && match.params.id !== prevProps.match?.params.id) {
            this.fetchDoctorDetails();
        }
    }

    async fetchDoctorDetails() {
        const { match } = this.props;

        try {
            const response = await axios.post('http://localhost:7070/api/get-doctor-details', {
                doctorId: match.params.id,
            });

            this.setState({ doctorDetails: response.data });
        } catch (error) {
            console.error('Error fetching doctor details:', error);
        }
    }

    render() {
        const { doctorDetails } = this.state;

        return (
            <div>
                {doctorDetails ? (
                    <>
                        <h2>Thông tin chi tiết bác sĩ</h2>
                        <p>Chức danh: {doctorDetails.valueVi}</p>
                        <p>Position: {doctorDetails.valueEn}</p>
                        <p>ID: {doctorDetails.doctorIds.join(', ')}</p>
                        {/* Thêm các thông tin khác của bác sĩ nếu cần */}
                    </>
                ) : (
                    <p>Không tìm thấy thông tin bác sĩ.</p>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorDetail));
