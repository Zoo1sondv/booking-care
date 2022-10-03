import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { createNewClinic } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({ ...stateCopy });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({ descriptionHTML: html, descriptionMarkdown: text });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ imageBase64: base64 });
    }
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add new clinic succeeds!');
      this.setState({ name: '', address: '', imageBase64: '', descriptionHTML: '', descriptionMarkdown: '' });
    } else {
      toast.error('Something wrong...');
    }
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý Phòng khám</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên Phòng khám</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.handleOnchangeInput(e, 'name')}
            />
          </div>

          <div className="col-6 form-group">
            <label>Ảnh Phòng khám</label>
            <input type="file" className="form-control-file" onChange={(e) => this.handleOnChangeImage(e)} />
          </div>

          <div className="col-6 form-group">
            <label>Địa chỉ Phòng khám</label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={(e) => this.handleOnchangeInput(e, 'address')}
            />
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: '300px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>

          <div className="col-12">
            <button className="btn-save-specialty" onClick={() => this.handleSaveNewClinic()}>
              Save
            </button>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
