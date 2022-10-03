import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManageScheduleDoctor from '../containers/System/Doctor/ManageScheduleDoctor';
import ManagePatient from '../containers/System/Doctor/ManagePatient';

class Doctor extends Component {
  render() {
    const { systemMenuPath, isLoggedIn, userInfo } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              {userInfo.roleId === 'R1' && <Route path="/doctor/manage-schedule" component={ManageSchedule} />}
              {userInfo.roleId === 'R2' && <Route path="/doctor/manage-schedule" component={ManageScheduleDoctor} />}
              <Route path="/doctor/manage-patient" component={ManagePatient} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
