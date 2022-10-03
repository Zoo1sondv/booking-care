import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './About.scss'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {

    render() {
        let settings = {
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2
        };
        return (
            <div className='wrapper-section wrapper-section-about'>
                <div className="section section-about">
                    <h3 className='header-section'>Truyền thông nói gì về website đặt lịch khám bệnh</h3>
                    <div className='section-about-content'>
                        <div className='about-content-left'>
                            {/* <iframe width="570" height="322" src="https://www.youtube.com/embed/FyDQljKtWnI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                        </div>
                        <div className='about-content-right'>
                            <p>Content bên này để viết nội dung...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
