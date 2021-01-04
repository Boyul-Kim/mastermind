import React from 'react';
import parseRoute from '../lib/parse-route';

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
      projectId: ''
    };
    this.handleChangeTaskName = this.handleChangeTaskName.bind(this);
    this.handleChangeDateCreated = this.handleChangeDateCreated.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeUserId = this.handleChangeUserId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const route = parseRoute(window.location.hash);
    this.setState({ projectId: Number(route.params.get('projectId')) });
  }

  handleChangeTaskName(event) {
    this.setState({ taskName: event.target.value });
  }

  handleChangeStatus(event) {
    this.setState({ statusId: Number(event.target.value) });
  }

  handleChangeDateCreated(event) {
    this.setState({ dateCreated: event.target.value });
  }

  handleChangeDeadline(event) {
    this.setState({ deadline: event.target.value });
  }

  handleChangeUserId(event) {
    this.setState({ userId: Number(event.target.value) });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/tasks/create', req);
  }

  render() {
    return (
      <div className="container-fluid mt-3">
        <h2>Create Task</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id="taskName" placeholder="Task Name" onChange={this.handleChangeTaskName} />
          </div>

          <div className="form-group">
            <select className="custom-select custom-select-sm mb-3" onChange={this.handleChangeStatus}>
              <option defaultValue>Status</option>
              <option value="1">Current Task</option>
              <option value="2">For Review</option>
              <option value="3">Completed</option>
              <option value="4">Backlog</option>
            </select>
          </div>

          <div className="form-group row d-flex justify-content-center">
            <div>
              <input type="text" className="form-control form-control-sm time-width mr-4" id="dateCreated" placeholder="Date Created" onChange={this.handleChangeDateCreated} />
            </div>
            <div>
              <input type="text" className="form-control form-control-sm time-width ml-4" id="deadline" placeholder="Deadline" onChange={this.handleChangeDeadline}/>
            </div>
          </div>

          <div className="form-group">
            <select className="custom-select custom-select-sm mb-3" onChange={this.handleChangeUserId}>
              <option defaultValue>User assigned</option>
              <option value="1">BoyulKim</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Task description</label>
            <textarea className="form-control" name="description" id="description" cols="30" rows="5" onChange={this.handleChangeDescription}></textarea>
          </div>

          <button type="submit" className="btn btn-danger mt-5">Submit</button>
        </form>
      </div>
    );
  }
}
