import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './HandBook.scss';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FormattedMessage } from 'react-intl';

class HandBook extends Component {
  render() {
    let settings = {
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    return (
      <div className="wrapper-section wrapper-section-handbook">
        <div className="section section-handbook">
          <h3 className="header-section">
            <FormattedMessage id="homepage.handbook" />
          </h3>
          <Slider {...settings}>
            <div className="handbook-child">
              <img src="https://cdn.bookingcare.vn/fr/w500/2021/04/09/141740-mindcare.png" className="img-handbook" />
              <p className="name-handbook">Trung tâm tham vấn, trị liệu Tâm lý MindCare Việt Nam</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2021/03/19/142809-golden-healthcare.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Phòng khám Đa khoa Quốc tế Golden Healthcare</p>
            </div>
            <div className="handbook-child">
              <img src="https://cdn.bookingcare.vn/fr/w500/2021/04/16/110944-sunnycare.png" className="img-handbook" />
              <p className="name-handbook">Viện Tư vấn Tâm lý SunnyCare</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2018/07/04/082317benh-vien-thanh-nhan.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Bệnh viện Thanh Nhàn</p>
            </div>
            <div className="handbook-child">
              <img src="https://cdn.bookingcare.vn/fr/w500/2018/09/18/152527acc2.jpg" className="img-handbook" />
              <p className="name-handbook">Phòng Khám ACC - Chiropractic Quận 1 TP.HCM</p>
            </div>
            <div className="handbook-child">
              <img src="https://cdn.bookingcare.vn/fr/w500/2021/04/11/172740-sihg.jpg" className="img-handbook" />
              <p className="name-handbook">Phòng khám đa khoa Singapore Indochina Healthcare Group (SIHG)</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2022/02/09/153155-anh-vinmec-hn.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Bệnh Viện Đa Khoa Quốc Tế Vinmec Times City</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/095958-benh-vien-dong-do1.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Bệnh viện Đa khoa Đông Đô</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/101123-bv-mat-dnd1.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Bệnh viện Mắt quốc tế DND</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2018/06/18/163407phong-kham-meditec.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Phòng khám Đa khoa Meditec</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2020/06/04/094107-quay-tiep-don-lao-khoa.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Bệnh viện Lão khoa Trung ương</p>
            </div>
            <div className="handbook-child">
              <img
                src="https://cdn.bookingcare.vn/fr/w500/2018/06/25/180121phong-kham-hoang-long1.jpg"
                className="img-handbook"
              />
              <p className="name-handbook">Phòng Khám Đa Khoa Hoàng Long</p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
