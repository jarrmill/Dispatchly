import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      division: "",
      assigned: "",
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDivisionChange = this.handleDivisionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleDivisionChange(e) {
    this.setState({ division: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { title, division } = this.state;
    this.props.handleSubmit(title, division);
  }
  render() {
    return (
      <div>
        Hello from Create Task 
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Task Name" onChange={this.handleTitleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Division</Form.Label>
            <Form.Control type="text" placeholder="Enter which division" onChange={this.handleDivisionChange} />
          </Form.Group>
          <Button type="submit" onClick={this.handleSubmit} >
            Submit
          </Button>
        </Form>
      </div>
    ); 
  }
}