import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    this.props.history.push(`/detail-clinic/${clinic.id}`);
  };

  render() {
    // let settings = {
    //     infinite: true,
    //     slidesToShow: 4,
    //     slidesToScroll: 4
    // };
    let { dataClinics } = this.state;

    return (
      <div className="wrapper-section wrapper-section-medical-facility">
        <div className="section section-medical-specility">
          <h3 className="header-section">
            <FormattedMessage id="homepage.outstanding-medical" />
          </h3>
          <Slider {...this.props.settings}>
            {dataClinics &&
              dataClinics.length > 0 &&
              dataClinics.map((item, index) => {
                return (
                  <div
                    className="section-customize clinic-child"
                    key={index}
                    onClick={() => this.handleViewDetailClinic(item)}
                  >
                    <img className="bg-image section-medical-facility" src={item.image} />
                    <p className="clinic-name">{item.name}</p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
