import React from 'react';

export default class EditTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      statusId: '',
      dateCreated: 'null',
      deadline: '',
      userId: '',
      description: '',
      username: '',
      statusName: '',
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/tasks/view/${this.props.taskId}`, { headers: { 'X-Access-Token': token } })
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/tasks/edit/${this.props.taskId}`, req)
      .then(res => res.json());
    window.location.hash = `#project?projectId=${this.props.projectId}`;
  }

  render() {
    return (

      <div className="container mt-3 ml-1">
        <div className="row justify-content-center">
          <form onSubmit={this.handleSubmit} className="form-width p-2">
            <h2>Edit Task</h2>
            <div className="d-flex flex-wrap">
              <div className="form-data-width mr-2">
                <h6>Task Name</h6>
                {this.state.taskName &&
                  <div className="form-group">
                  <input type="text" className="form-control-sm form-control task-input-width" id="taskName" value={this.state.taskName} onChange={this.handleChange} name="taskName" />
                  </div>
                }
              </div>

              <div className="form-data-width">
                <h6>Status Name</h6>
                {this.state.statusName &&
                  <div className="form-group">
                  <select className="custom-select custom-select-sm task-input-width" onChange={this.handleChange} name="statusId">
                      <option value={this.state.statusId}>{this.state.statusName}</option>
                      <option value="1">Current Task</option>
                      <option value="2">For Review</option>
                      <option value="3">Completed</option>
                      <option value="4">Backlog</option>
                    </select>
                  </div>
                }
              </div>

              <div className="form-data-width mr-2">
                <h6>Deadline</h6>
                {this.state.deadline &&
                  <div className="form-group">
                  <input type="text" className="form-control-sm form-control task-input-width" id="deadline" value={this.state.deadline} onChange={this.handleChange} name="deadline" />
                  </div>
                }
              </div>

              <div className="form-data-width">
                <h6>Username</h6>
                {this.state.username &&
                  <div className="form-group">
                  <select className="custom-select custom-select-sm task-input-width" onChange={this.handleChange} name="userId">
                      <option value={this.state.userId}>{this.state.username}</option>
                      {
                        this.state.users.map(user => (
                          <option key={user.userId} value={user.userId}>{user.username}</option>
                        ))
                      }
                    </select>
                  </div>
                }
              </div>

              <div className="description-input-width">
                <h6>Description</h6>
                {this.state.description &&
                  <div className="form-group">
                  <textarea className="form-control task-input-description-width" name="description" id="description" value={this.state.description} cols="30" rows="5" onChange={this.handleChange} ></textarea>
                  </div>
                }

                <button type="submit" className="btn btn-success mt-2">Submit</button>
              </div>

            </div>

          </form>
        </div>

      </div>

    );
  }
}
