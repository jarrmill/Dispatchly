import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class EditOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrg: "",
      show: false,
      modalMessage: "",
      member: ""
    };
    this.renderOrgs = this.renderOrgs.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMemberSubmit = this.handleMemberSubmit.bind(this);
  }

  openModal(orgName) {
    let { show } = this.state;
    console.log('Switching: ', !show);
    this.setState({show: true, currentOrg: orgName});
  }
  closeModal(e) {
    e.preventDefault();
    console.log('Hello!')
    this.setState({show : false})
  }
  handleDelete(e, organization) {
    e.preventDefault();
    let { email } = this.props.auth;
    console.log('Deleting link for: ', email, organization);
    this.props.handleUserOrgDelete(email, organization);
  }
  handleTextChange(e) {
    this.setState({ member: e.target.value });
  }
  handleMemberSubmit(e) {
    e.preventDefault();
    let { member, currentOrg } = this.state;
    let { email } = this.props.auth
    console.log('Submitting user: ', member, currentOrg, email);
    this.props.adminAddUser(currentOrg, email, member);
    this.setState({ member: ''});
  }
  renderOrgs() {
    let { tasks } = this.props;
    if (tasks === [])
    { 
      return null 
    }
      else {
        let results = Object.keys(tasks).map((orgName) => {
          return (
              <div>
                {orgName}
                <Button size="sm" variant="outline-success" onClick={(e) => this.openModal(orgName)}>Add Members</Button>
                <Button size="sm" variant="outline-danger" onClick={(e) => this.handleDelete(e, orgName)}>Leave Group</Button>
              </div>
            )
        });
        return results;
      }
  }

  render() {
    let { show, member } = this.state;
    return (
      <div>
        <h4>Edit Organizations</h4>
        {this.renderOrgs()}
        <Modal show={show} onHide={this.closeModal}>
          <Modal.Header>
            <Modal.Title>Add Members for {this.state.currentOrg}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  Add a Member
                </Form.Label>
                <Form.Control type="text" value={member} onChange={this.handleTextChange}/>
                <Form.Text clasName="text-muted">
                  Please note that you can only add users if you are admin.
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
            <Button variant="primary" onClick={this.handleMemberSubmit}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    ); 
  }
}