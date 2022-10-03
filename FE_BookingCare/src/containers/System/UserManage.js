import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import { reject } from 'lodash';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenModalEditUser: false,
    };
  }

  state = {};

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let response = await getAllUser('ALL');
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  deleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Life cycle:
   * Run component:
   * 1. Run constructor -> init state
   * 2. Did mount (set state)
   * 3. Render
   *
   */

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };

  handleEditUser = (user) => {
    emitter.emit('EVENT_SET_MODAL_EDIT_USER', user);
    this.setState({
      isOpenModalEditUser: true,
    });
  };

  toogleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toogleUserModalEdit = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModal: false,
        });
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (error) {
      reject(error);
    }
  };

  editUser = async (data) => {
    try {
      let response = await editUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModalEditUser: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModal}
          toggleFromParent={this.toogleUserModal}
          createNewUser={this.createNewUser}
        />
        <ModalEditUser
          isOpen={this.state.isOpenModalEditUser}
          editUser={this.editUser}
          toggleFromParent={this.toogleUserModalEdit}
          // createNewUser={this.createNewUser}
        />
        <div className="user-table mt-5 mx-3">
          <h3 className="text-center">MANAGE USER</h3>
          <div className="mx-1">
            <button
              className="btn btn-primary px-3 mb-3"
              onClick={() => {
                this.handleAddNewUser();
              }}
            >
              <i className="fas fa-plus pe-2"></i>
              Add a new user
            </button>
          </div>

          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button onClick={() => this.handleEditUser(item)}>Edit</button>
                        <button onClick={() => this.deleteUser(item)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
