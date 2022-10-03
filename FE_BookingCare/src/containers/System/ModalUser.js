import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap'
import { textChangeRangeIsUnchanged } from 'typescript';
import { emitter } from '../../utils/emitter'
class ModalUser extends Component {


    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
        }

        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameters: ' + arrInput[i])
                break;
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }

    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className="modal-user-container"
            >
                <ModalHeader
                    toggle={() => { this.toggle() }}
                >
                    Create A New Users
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body '>
                        <div className='modal-row'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "email") }} value={this.state.email} />
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password' onChange={(event) => { this.handleOnchangeInput(event, "password") }} value={this.state.password} />
                            </div>
                        </div>
                        <div className='modal-row'>
                            <div className='input-container'>
                                <label>FirstName</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "firstName") }} value={this.state.firstName} />
                            </div>
                            <div className='input-container'>
                                <label>LastName</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "lastName") }} value={this.state.lastName} />
                            </div>
                        </div>
                        <div className='modal-row width-100'>
                            <div className='input-container'>
                                <label>Address</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "address") }} value={this.state.address} />
                            </div>
                        </div>
                        <div className='modal-row width-100'>
                            <div className='input-container'>
                                <label>Phone Number</label>
                                <input type='text' onChange={(event) => { this.handleOnchangeInput(event, "phoneNumber") }} value={this.state.phoneNumber} />
                            </div>
                        </div>

                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        type='submit'
                        onClick={() => { this.handleAddNewUser() }}
                    >
                        Add New
                    </Button>
                    {' '}
                    <Button
                        onClick={() => { this.toggle() }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
