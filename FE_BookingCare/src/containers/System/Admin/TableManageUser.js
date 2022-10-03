import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
    };
  }

  async componentDidMount() {
    this.props.getAllUser();
  }

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  deleteUser = (userId) => {
    this.props.deleteUser(userId);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.userArr !== this.props.userRedux) {
      this.setState({
        userArr: this.props.userRedux,
      });
    }
  }

  render() {
    let users = this.state.userArr;

    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Position Key</th>
              <th>Role Key</th>
              <th>Action</th>
            </tr>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.positionId}</td>
                <td>{item.roleId}</td>
                <td>
                  <button onClick={() => this.handleEditUser(item)}>Edit</button>
                  <button onClick={() => this.deleteUser(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(actions.fetchUserSuccess()),
    deleteUser: (userId) => dispatch(actions.deleteUserSuccess(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
