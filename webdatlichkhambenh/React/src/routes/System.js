import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import Manage_Patient from '../containers/System/Patient/Manage_Patient';
import ManagePatients from '../containers/System/Admin/ManagePatients';
import ManageHandbook from '../containers/System/Handbook/ManageHandbook';
import ManageSchedule from '../containers/Patient/Doctor/ManageSchedule';
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/doctor/manage-patient" component={ManagePatient} />
                            <Route path="/system/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/system/patient/manage_patient" component={Manage_Patient} />
                            <Route path="/system/admin/manage-patients" component={ManagePatients} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-handbook" component={ManageHandbook} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
