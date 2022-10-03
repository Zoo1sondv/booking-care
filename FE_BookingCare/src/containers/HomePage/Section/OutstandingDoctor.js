import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingDoctor.scss';
import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  render() {
    let allDoctors = this.state.arrDoctors;
    let language = this.props.language;
    return (
      <div className="wrapper-section wrapper-section-outstanding-doctor">
        <div className="section section-outstanding-doctor">
          <h3 className="header-section">
            <FormattedMessage id="homepage.outstanding-doctor" />
          </h3>
          <Slider {...this.props.settings}>
            {allDoctors &&
              allDoctors.length > 0 &&
              allDoctors.map((item, index) => {
                let imageBase64 = '';
                if (item.image) {
                  imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                }
                let nameVi = `Bác sĩ, ${item.firstName} ${item.lastName}`;
                let nameEn = `Doctor, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="section-customize" onClick={() => this.handleViewDetailDoctor(item)} key={index}>
                    <img src={`${imageBase64}`} className="img-doctor" />
                    <p className="doctor-name">{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
