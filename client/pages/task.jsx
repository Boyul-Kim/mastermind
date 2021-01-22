import React from 'react';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      task: null
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {

    const token = window.localStorage.getItem('user-jwt');
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    };
    fetch(`/api/tasks/delete/${this.props.taskId}`, req);
    window.location.hash = `#project?projectId=${this.props.projectId}`;
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/tasks/view/${this.props.taskId}`, { headers: { 'X-Access-Token': token } })
      .then(res => res.json())
      .then(result => this.setState({ task: result }));
  }

  render() {
    return (

      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="form-width p-2">
            <h2>Task</h2>
            <div className="d-flex flex-wrap">
              <div className="form-data-width mr-2">
                <h6>Task Name</h6>
                {this.state.task &&
                  <div className="form-group">
                    <input type="text" className="form-control-sm form-control task-input-width" id="taskName" value={this.state.task.taskName} name="taskName" readOnly />
                  </div>
                }
              </div>

              <div className="form-data-width">
                <h6>Status Name</h6>
                {this.state.task &&
                  <div className="form-group">
                  <select className="custom-select custom-select-sm task-input-width" name="statusId" disabled>
                      <option value={this.state.task.statusId}>{this.state.task.statusName}</option>
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
                {this.state.task &&
                  <div className="form-group">
                  <input type="text" disabled className="form-control-sm form-control task-input-width" id="deadline" value={this.state.task.deadline} name="deadline" />
                  </div>
                }
              </div>

              <div className="form-data-width">
                <h6>Username</h6>
                {this.state.task &&
                  <div className="form-group">
                  <select className="custom-select custom-select-sm task-input-width" name="userId" disabled>
                    <option value={this.state.task.userId}>{this.state.task.username}</option>
                    </select>
                  </div>
                }
              </div>

              <div className="description-input-width">
                <h6>Description</h6>
                {this.state.task &&
                  <div className="form-group">
                  <textarea className="form-control task-input-description-width" disabled name="description" id="description" value={this.state.task.description} cols="30" rows="5" ></textarea>
                  </div>
                }

                <div>
                  <a href={`#editTask?projectId=${this.props.projectId}&taskId=${this.props.taskId}`}>
                    <button type="submit" className="btn btn-success mt-3 mb-3">Edit</button>
                  </a>

                  <button onClick={this.handleDelete} type="submit" className="btn btn-danger mt-3 mb-3 ml-3">Delete</button>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    );
  }
}
