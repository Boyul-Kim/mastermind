import React from 'react';
import Navbar from '../components/navbar';

export default class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      statusId: '',
      dateCreated: '',
      deadline: '',
      userId: '',
      description: '',
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    const token = window.localStorage.getItem('user-jwt');
    fetch('/api/users', { headers: { 'X-Access-Token': token } })
      .then(res => res.json())
      .then(result => {
        this.setState({ users: this.state.users.concat(result) });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('user-jwt');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/tasks/create/${this.props.projectId}`, req)
      .then(res => res.json());
    window.location.hash = `#project?projectId=${this.props.projectId}`;
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid mt-3">
          <h2>Create Task</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" id="taskName" placeholder="Task Name" onChange={this.handleChange} name="taskName" />
            </div>

            <div className="form-group">
              <select className="custom-select custom-select-sm mb-3" onChange={this.handleChange} name="statusId">
                <option defaultValue>Status</option>
                <option value="1">Current Task</option>
                <option value="2">For Review</option>
                <option value="3">Completed</option>
                <option value="4">Backlog</option>
              </select>
            </div>

            <div className="form-group row d-flex justify-content-center">
              <div>
                <input type="text" className="form-control form-control-sm time-width mr-4" id="dateCreated" placeholder="Date Created" onChange={this.handleChange} name="dateCreated" />
              </div>
              <div>
                <input type="text" className="form-control form-control-sm time-width ml-4" id="deadline" placeholder="Deadline" onChange={this.handleChange} name="deadline" />
              </div>
            </div>

            <div className="form-group">
              <select className="custom-select custom-select-sm mb-3" onChange={this.handleChange} name="userId">
                <option defaultValue>User assigned</option>
                {
                  this.state.users.map(user => (
                    <option key={user.userId} value={user.userId}>{user.username}</option>
                  ))
                }
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Task description</label>
              <textarea className="form-control" name="description" id="description" cols="30" rows="5" onChange={this.handleChange} ></textarea>
            </div>

            <button type="submit" className="btn btn-danger mt-5">Submit</button>

          </form>
        </div>
      </div>
    );
  }
}
