import React from 'react';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      task: null
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/tasks/view/${this.props.taskId}`, { headers: { 'X-Access-Token': token } })
      .then(res => res.json())
      .then(result => this.setState({ task: result }));
  }

  render() {
    return (

      <div className="container mt-3 ml-1">
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

                  <a href={`#editTask?projectId=${this.props.projectId}&taskId=${this.props.taskId}`}>
                    <button type="submit" className="btn btn-success mt-3 mb-3">Edit</button>
                 </a>
              </div>

            </div>

          </div>
        </div>

      </div>

    // <div className="container mt-3">
    //   <h2>View Task</h2>

    //   <div className="mt-3">
    //     <h6>Task Name</h6>

    //     <div className="view-task">
    //       {this.state.task &&
    //         <div className="ml-2 mt-1">
    //           {this.state.task.taskName}
    //         </div>
    //       }
    //     </div>

    //     <h6 className="mt-2">Status Name</h6>

    //     <div className="view-task mt-2">
    //       {this.state.task &&
    //         <div className="ml-2 mt-1">
    //           {this.state.task.statusName}
    //         </div>
    //       }
    //     </div>

    //     <div className="d-flex flex-row mt-2">
    //       <h6 className="width-50">Date Created</h6>
    //       <h6 className="width-50 ml-5">Deadline</h6>
    //     </div>

    //     <div className="d-flex flex-row justify-content-around p-0">
    //       <div className="view-task width-50 mr-5 p-0">
    //         {this.state.task &&
    //           <div className="ml-2 mt-1">
    //             {this.state.task.dateCreated}
    //           </div>
    //         }
    //       </div>
    //       <div className="view-task width-50 mr-0 p-0">
    // {this.state.task &&
    //   <div className="ml-2 mt-1">
    //     {this.state.task.deadline}
    //   </div>
    // }
    //       </div>
    //     </div>

    //     <h6 className="mt-2">Username</h6>
    //     <div className="view-task mt-2">
    // {this.state.task &&
    //   <div className="ml-2 mt-1">
    //     {this.state.task.username}
    //   </div>
    // }
    //     </div>

    //     <h6 className="mt-2">Description</h6>
    //     <div className="view-task height-desc mt-2">
    //       {this.state.task &&
    //         <div className="ml-2">
    //           {this.state.task.description}
    //         </div>
    //       }
    //     </div>

    //     <a href={`#editTask?projectId=${this.props.projectId}&taskId=${this.props.taskId}`}>
    //       <button type="submit" className="btn btn-success mt-3 mb-3">Edit</button>
    //     </a>

    //   </div>

    // </div>
    );
  }
}
