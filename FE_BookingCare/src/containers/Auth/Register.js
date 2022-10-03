import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleRegister } from '../../services/userService';
import * as actions from '../../store/actions';
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      retypePassword: '',
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
      gender: '1',
      isShowPassword: false,
      isShowRetypePassword: false,
      phoneFocused: false,
      userFocused: false,
      passFocused: false,
      rPassFocused: false,
      errMessage: '',
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlePhoneFocus = (e) => {
    this.setState({
      phoneFocused: true,
    });
  };

  handleUserFocus = (e) => {
    this.setState({
      userFocused: true,
    });
  };

  handlePassFocus = (e) => {
    this.setState({
      passFocused: true,
    });
  };

  handleRPassFocus = (e) => {
    this.setState({
      rPassFocused: true,
    });
  };

  handleFocus = (e) => {
    this.setState({
      phoneFocused: true,
      userFocused: true,
      passFocused: true,
      rPassFocused: true,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const phoneCheck = document.getElementById('phoneNumber').checkValidity();
    const usernameCheck = document.getElementById('username').checkValidity();
    const passwordCheck = document.getElementById('password').checkValidity();
    const rpCheck = document.getElementById('retypePassword').checkValidity();

    const isSubmit = phoneCheck && usernameCheck && passwordCheck && rpCheck;

    if (isSubmit) {
      this.handleRegister();
    }
  };

  handleRegister = async () => {
    this.setState({
      errMessage: '',
    });

    try {
      const data = {
        email: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
      };

      const newUser = await handleRegister(data);
      if (newUser && newUser.errCode !== 0) {
        this.setState({
          errMessage: newUser.message,
        });
      } else {
        this.props.userRegisterSuccess(newUser.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.newUser) {
          this.setState({
            errMessage: error.response.newUser.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleShowHideRetypePassword = () => {
    this.setState({
      isShowRetypePassword: !this.state.isShowRetypePassword,
    });
  };

  render() {
    return (
      <div className="register-background">
        <div className="register-container">
          <div className="register-content row">
            <form onSubmit={this.handleSubmit}>
              <h3 className="col-12 register">
                <Link to={'/home'} className="link">
                  <i className="fa fa-home"></i>
                </Link>
              </h3>
              <div className="col-12 text-register">Register</div>

              <div className="col-12 form-group inline">
                <div className="form-group col-md-6 space">
                  <label htmlFor="inputFirstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleInput}
                  />
                </div>
                <div className="form-group col-md-6 space-right">
                  <label htmlFor="inputLastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleInput}
                  />
                </div>
              </div>

              <div className="col-12 form-group">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="1234 Main St"
                  value={this.state.address}
                  onChange={this.handleInput}
                />
              </div>

              <div className="col-12 form-group inline">
                <div className="form-group col-md-8 space">
                  <label htmlFor="inputPhoneNumber">
                    Phone Number<span>*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.handleInput}
                    onBlur={this.handlePhoneFocus}
                    focused={this.state.phoneFocused.toString()}
                    required={true}
                    pattern="[0-9]{10}$"
                  />
                  <span>Please enter your phone number (0-9)</span>
                </div>
                <div className="form-group col-md-4 space-right">
                  <label htmlFor="inputSex">Gender</label>
                  <select name="gender" value={this.state.gender} className="form-control" onChange={this.handleInput}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
              </div>

              <div className="col-12 form-group register-input">
                <label>
                  Username:<span>*</span>
                </label>
                <input
                  id="username"
                  type="email"
                  name="username"
                  className="form-control"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={this.handleInput}
                  onBlur={this.handleUserFocus}
                  focused={this.state.userFocused.toString()}
                  required={true}
                />
                <span>It should be a valid email address!</span>
              </div>

              <div className="col-12 form-group register-input">
                <label>
                  Password: <span>*</span>
                </label>
                <div className="custom-input-password">
                  <input
                    id="password"
                    type={this.state.isShowPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInput}
                    onBlur={this.handlePassFocus}
                    focused={this.state.passFocused.toString()}
                    required={true}
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
                  />
                  <span>Minimum 8 characters, at least 1 uppercase, lowercase and number!</span>

                  <div onClick={() => this.handleShowHidePassword()}>
                    <i className={this.state.isShowPassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                  </div>
                </div>
              </div>

              <div className="col-12 form-group register-input">
                <label>
                  Retype Password: <span>*</span>
                </label>
                <div className="custom-input-password">
                  <input
                    id="retypePassword"
                    type={this.state.isShowRetypePassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Enter your password"
                    name="retypePassword"
                    value={this.state.retypePassword}
                    onChange={this.handleInput}
                    onBlur={this.handleRPassFocus}
                    focused={this.state.rPassFocused.toString()}
                    required={true}
                    pattern={this.state.password}
                  />
                  <span>Password don't match!</span>

                  <div onClick={() => this.handleShowHideRetypePassword()}>
                    <i className={this.state.isShowRetypePassword ? 'far fa-eye-slash' : 'far fa-eye'}></i>
                  </div>
                </div>
              </div>

              <div className="col-12" style={{ color: 'red' }}>
                {this.state.errMessage}
              </div>

              <div className="col-12">
                <button className="btn-register" onClick={this.handleFocus}>
                  Register
                </button>
              </div>

              <div className="col-12 text-center mt-1 link">
                <Link to={'/login'}>Already have an account. Login here!</Link>
              </div>
            </form>
          </div>
        </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // userRegisterFail: () => dispatch(actions.adminRegisterFail()),
    userRegisterSuccess: (userInfo) => dispatch(actions.userRegisterSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
