import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { Redirect, withRouter } from 'react-router';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class HomeHeader extends Component {
  changeLanguage = (language) => {
    // fire redux event(action)
    // hàm mapDispatchToProps giúp chuyển các hàm bên trong nó tới props,
    // nên ta sử dụng this.props ở đây
    this.props.changeLanguageAppRedux(language);
  };

  loadToHomePage = () => {
    if (this.props.history) {
      this.props.history.push('/home');
    }
  };

  showAnnounce = () => {
    toast.info(<FormattedMessage id="home-header.Features-not-available-at-the-moment-will-develop-in-the-future" />);
  };

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.showAnnounce();
    }
  };

  render() {
    const { userInfo, isLoggedIn, processLogout, language } = this.props;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo" onClick={() => this.loadToHomePage()}></div>
            </div>
            <div className="center-content">
              <div className="child-content" onClick={() => this.showAnnounce()}>
                <div className="child-title">
                  <b>
                    <FormattedMessage id="home-header.speciality" />
                  </b>
                </div>
                <div className="child-desc">
                  <p>
                    <FormattedMessage id="home-header.search-doctor" />
                  </p>
                </div>
              </div>
              <div className="child-content" onClick={() => this.showAnnounce()}>
                <div className="child-title">
                  <b>
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div className="child-desc">
                  <p>
                    <FormattedMessage id="home-header.select-room" />
                  </p>
                </div>
              </div>
              <div className="child-content" onClick={() => this.showAnnounce()}>
                <div className="child-title">
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="child-desc">
                  <p>
                    <FormattedMessage id="home-header.select-doctor" />
                  </p>
                </div>
              </div>
              <div className="child-content" onClick={() => this.showAnnounce()}>
                <div className="child-title">
                  <b>
                    <FormattedMessage id="home-header.fee" />
                  </b>
                </div>
                <div className="child-desc">
                  <p>
                    <FormattedMessage id="home-header.check-health" />
                  </p>
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <p>
                  <FormattedMessage id="home-header.support" />
                </p>
              </div>
              <div className={language === LANGUAGES.VI ? 'language-vi active-language' : 'language-vi'}>
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
              </div>
              <div className={language === LANGUAGES.EN ? 'language-en active-language' : 'language-en'}>
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
              </div>
              {isLoggedIn && (
                <div className="user">
                  <span className="welcome">
                    <FormattedMessage id="home-header.hi"></FormattedMessage>,{' '}
                    {userInfo && userInfo.firstName ? userInfo.firstName : ''}!
                  </span>
                  <div className="btn btn-logout" onClick={processLogout} title="Log out">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </div>
              )}

              {!isLoggedIn && (
                <div className="login">
                  <Link to={'/login'}>Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="home-content-img">
              <div className="title1">
                <FormattedMessage id="header-banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="header-banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm lý do khám" onKeyPress={this.handleEnter} />
              </div>
              <div className="options">
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option1"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option1" />
                  </h4>
                </div>
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option2"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option2" />
                  </h4>
                </div>
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option3"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option3" />
                  </h4>
                </div>
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option4"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option4" />
                  </h4>
                </div>
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option5"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option5" />
                  </h4>
                </div>
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option6"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option6" />
                  </h4>
                </div>
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option7"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option7" />
                  </h4>
                </div>
                <div className="option-items" onClick={() => this.showAnnounce()}>
                  <div className="option-img">
                    <div className="option-content-img option8"></div>
                  </div>
                  <h4 className="option-title">
                    <FormattedMessage id="header-banner.options.option8" />
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
