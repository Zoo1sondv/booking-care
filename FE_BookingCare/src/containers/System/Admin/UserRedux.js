import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';
import { CommonUtils } from '../../../utils';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      userArr: [],
      isOpen: false,

      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',
      previewImgUrl: '',

      isEditing: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionData();
    this.props.getRoleData();
    this.props.getAllUser();
  }

  openPreviewImage = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
    }

    this.setState({
      id: user.id,
      email: user.email,
      password: '',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: '',
      previewImgUrl: imageBase64,

      isEditing: true,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
      });
    }
    if (prevProps.userRedux !== this.props.userRedux) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      this.setState({
        userArr: this.props.userRedux,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
        avatar: '',
        previewImgUrl: '',
      });
    }
  }

  handleSaveUser = (e) => {
    e.preventDefault();
    if (!this.state.isEditing) {
      if (this.checkValidateInput()) {
        this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phoneNumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          avatar: this.state.avatar,
        });
      }
    }

    if (this.state.isEditing) {
      // Xử lí editing
      this.props.editUser({
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        avatar: base64,
        previewImgUrl: objectUrl,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert('Missing parameter: ' + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };

    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let users = this.state.userArr;
    let language = this.props.language;
    let isGetData = this.props.isLoadingData;
    let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
    return (
      <>
        <div className="user-redux-container">
          <div className="title">
            <FormattedMessage id={'manage-user.title'} />
          </div>
          <div>{isGetData ? 'Loading genders...' : ''}</div>
          <div className="user-redux-body">
            <div className="user-redux-add">
              <div className="container">
                <div className="">
                  <div
                    className="title-add-user"
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      padding: '15px 0',
                    }}
                  >
                    <FormattedMessage id={'manage-user.add'} />
                  </div>
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">
                          <FormattedMessage id={'manage-user.email'} />
                        </label>
                        <FormattedMessage id="manage-user.email" defaultMessage="email">
                          {(msg) => (
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail4"
                              placeholder={msg}
                              value={email}
                              onChange={(event) => {
                                this.onChangeInput(event, 'email');
                              }}
                              disabled={this.state.isEditing}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">
                          <FormattedMessage id={'manage-user.password'} />
                        </label>

                        <FormattedMessage id="manage-user.password" defaultMessage="password">
                          {(msg) => (
                            <input
                              type="password"
                              className="form-control"
                              id="inputPassword4"
                              placeholder={msg}
                              value={password}
                              onChange={(e) => {
                                this.onChangeInput(e, 'password');
                              }}
                              disabled={this.state.isEditing}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">
                          <FormattedMessage id={'manage-user.address'} />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="1234 Trieu Khuc"
                          value={address}
                          onChange={(e) => {
                            this.onChangeInput(e, 'address');
                          }}
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputState">
                          <FormattedMessage id={'manage-user.position'} />
                        </label>
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => {
                            this.onChangeInput(e, 'position');
                          }}
                          value={position}
                        >
                          {positions &&
                            positions.length > 0 &&
                            positions.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {language === 'vi' ? item.valueVi : item.valueEn}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputState">
                          <FormattedMessage id={'manage-user.role'} />
                        </label>
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => {
                            this.onChangeInput(e, 'role');
                          }}
                          value={role}
                        >
                          {roles &&
                            roles.length > 0 &&
                            roles.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {language === 'vi' ? item.valueVi : item.valueEn}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">
                          <FormattedMessage id={'manage-user.firstName'} />
                        </label>
                        <input
                          className="form-control"
                          id="inputPassword4"
                          placeholder="Van A"
                          value={firstName}
                          onChange={(e) => {
                            this.onChangeInput(e, 'firstName');
                          }}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">
                          <FormattedMessage id={'manage-user.lastName'} />
                        </label>
                        <input
                          className="form-control"
                          id="inputPassword4"
                          placeholder="Nguyen"
                          value={lastName}
                          onChange={(e) => {
                            this.onChangeInput(e, 'lastName');
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputCity">
                          <FormattedMessage id={'manage-user.phoneNumber'} />
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputCity"
                          placeholder="+84..."
                          value={phoneNumber}
                          onChange={(e) => {
                            this.onChangeInput(e, 'phoneNumber');
                          }}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">
                          <FormattedMessage id={'manage-user.gender'} />
                        </label>
                        <select
                          id="inputState"
                          className="form-control"
                          onChange={(e) => {
                            this.onChangeInput(e, 'gender');
                          }}
                          value={gender}
                        >
                          {genders &&
                            genders.length > 0 &&
                            genders.map((item, index) => (
                              <option key={index} value={item.keyMap}>
                                {language == 'vi' ? item.valueVi : item.valueEn}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="inputZip">
                          <FormattedMessage id={'manage-user.image'} />
                        </label>
                        <div className="preview-img-container">
                          <input id="previewImg" type="file" hidden onChange={(e) => this.handleOnChangeImage(e)} />
                          <label htmlFor="previewImg" className="label-upload">
                            Tải ảnh
                            <i className="fas fa-upload"></i>
                          </label>
                          <div
                            className="preview-image"
                            onClick={() => this.openPreviewImage()}
                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSaveUser(e)}>
                      <FormattedMessage id={'manage-user.addUser'} />
                    </button>
                  </form>
                </div>
                <TableManageUser usersData={users} handleEditUserFromParent={this.handleEditUserFromParent} />
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox mainSrc={this.state.previewImgUrl} onCloseRequest={() => this.setState({ isOpen: false })} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.position,
    roleRedux: state.admin.roles,
    isLoadingData: state.admin.isLoadingData,
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionData: () => dispatch(actions.fetchPositionSuccess()),
    getRoleData: () => dispatch(actions.fetchRoleSuccess()),
    createNewUser: (data) => dispatch(actions.createUserSuccess(data)),
    getAllUser: () => dispatch(actions.fetchUserSuccess()),
    editUser: (data) => dispatch(actions.editUserSuccess(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
