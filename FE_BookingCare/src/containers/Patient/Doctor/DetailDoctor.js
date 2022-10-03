import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailInforDoctor } from '../../../services/userService';
import './DetailDoctor.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
import Comment from '../SocialPlugin/Comment';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter';

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  render() {
    let detailDoctor = this.state.detailDoctor;
    let { language } = this.props;

    let nameDoctor;
    if (detailDoctor && !_.isEmpty(detailDoctor)) {
      nameDoctor =
        language === LANGUAGES.VI
          ? `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
          : `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
    }

    let currentURl =
      +process.env.REACT_APP_IS_LOCALHOST === 1 ? 'https://eric-restaurant-bot-tv.herokuapp.com' : window.location.href;

    return (
      <div className="detail-doctor-container">
        <HomeHeader isShowBanner={false} />
        <div className="introduce-doctor">
          <div className="introduce-content-left" style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>
          <div className="introduce-content-right">
            <h1 className="doctor-name">{nameDoctor}</h1>
            <div className="doctor-description">
              {detailDoctor.Markdown && detailDoctor.Markdown.description && <p>{detailDoctor.Markdown.description}</p>}
            </div>
            <div className="like-share-doctor">
              <LikeAndShare dataHref={currentURl} with={'100%'} />
            </div>
          </div>
        </div>

        <div className="schedule-doctor">
          <div className="content-left">
            <DoctorSchedule doctorIdFromParent={this.state.currentDoctorId} />
          </div>
          <div className="content-right">
            <DoctorExtraInfo doctorIdFromParent={this.state.currentDoctorId} />
          </div>
        </div>

        {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
          <>
            <div
              className="content-detail-doctor"
              dangerouslySetInnerHTML={{
                __html: detailDoctor.Markdown.contentHTML,
              }}
            ></div>

            <div className="comment-doctor">
              <Comment dataHref={currentURl} width={'100%'} />
            </div>
          </>
        )}

        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
