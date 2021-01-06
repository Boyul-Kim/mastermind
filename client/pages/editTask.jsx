import React from 'react';

export default class EditTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      statusId: '',
      dateCreated: '',
      deadline: '',
      userId: '',
      description: '',
      username: '',
      statusName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/tasks/view/${this.props.taskId}`)
      .then(res => res.json())
      .then(result => this.setState({
        taskName: result.taskName,
        statusId: result.statusId,
        dateCreated: result.dateCreated,
        deadline: result.deadline,
        userId: result.userId,
        description: result.description,
        statusName: result.statusName,
        username: result.username
      }));
  }

  handleChange(event) {
    const { name, value } = event.target;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/tasks/edit/${this.props.taskId}`, req)
      .then(res => res.json());
    window.location.hash = `#project?projectId=${this.props.projectId}`;
  }

  render() {
    return (
      <div className="container-fluid mt-3">
        <h2>Edit Task</h2>

        <form onSubmit={this.handleSubmit}>
          {this.state.taskName &&
            <div className="form-group">
              <input type="text" className="form-control" id="taskName" value={this.state.taskName} onChange={this.handleChange} name="taskName" />
            </div>
          }

          {this.state.statusName &&
            <div className="form-group">
              <select className="custom-select custom-select-sm mb-3" onChange={this.handleChange} name="statusId">
                <option value={this.state.statusId}>{this.state.statusName}</option>
                <option value="1">Current Task</option>
                <option value="2">For Review</option>
                <option value="3">Completed</option>
                <option value="4">Backlog</option>
              </select>
            </div>
          }

          {this.state.dateCreated && this.state.deadline &&
            <div className="form-group row d-flex justify-content-center">
              <div>
                <input type="text" className="form-control form-control-sm time-width mr-4" id="dateCreated" value={this.state.dateCreated} onChange={this.handleChange} name="dateCreated" />
              </div>
              <div>
                <input type="text" className="form-control form-control-sm time-width ml-4" id="deadline" value={this.state.deadline} onChange={this.handleChange} name="deadline" />
              </div>
            </div>
          }

          {this.state.username &&
            <div className="form-group">
              <select className="custom-select custom-select-sm mb-3" onChange={this.handleChange} name="userId">
                <option value={this.state.userId}>{this.state.username}</option>
                <option value="1">BoyulKim</option>
              </select>
            </div>
          }

          {this.state.description &&
            <div className="form-group">
              <label htmlFor="description">Task description</label>
            <textarea className="form-control" name="description" id="description" value={this.state.description} cols="30" rows="5" onChange={this.handleChange} ></textarea>
            </div>
          }

          <button type="submit" className="btn btn-danger mt-5">Submit</button>

        </form>
      </div>
    );
  }
}
