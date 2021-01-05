import React from 'react';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      task: null
    };
  }

  componentDidMount() {
    fetch(`/api/tasks/view/${this.props.taskId}`)
      .then(res => res.json())
      .then(result => this.setState({ task: result }));
  }

  render() {
    return (
      <div className="container-fluid mt-3">
        <h2>View Task</h2>

        <div className="mt-3">
            <h6>Task Name</h6>

              <div className="view-task">
                {this.state.task &&
                  <div className="ml-2 mt-1">
                    {this.state.task.taskName}
                  </div>
                }
              </div>

            <h6 className="mt-2">Status Name</h6>

              <div className="view-task mt-2">
                {this.state.task &&
                  <div className="ml-2 mt-1">
                    {this.state.task.statusName}
                  </div>
                }
              </div>

            <div className="d-flex flex-row mt-2">
              <h6 className="width-50">Date Created</h6>
              <h6 className="width-50 ml-5">Deadline</h6>
            </div>

            <div className="d-flex flex-row justify-content-around p-0">
              <div className="view-task width-50 mr-5 p-0">
                {this.state.task &&
                  <div className="ml-2 mt-1">
                    {this.state.task.dateCreated}
                  </div>
                }
              </div>
              <div className="view-task width-50 mr-0 p-0">
                  {this.state.task &&
                    <div className="ml-2 mt-1">
                      {this.state.task.deadline}
                    </div>
                  }
              </div>
            </div>

            <h6 className="mt-2">Username</h6>
            <div className="view-task mt-2">
              {this.state.task &&
                <div className="ml-2 mt-1">
                  {this.state.task.username}
                </div>
              }
            </div>

            <h6 className="mt-2">Description</h6>
            <div className="view-task height-desc mt-2">
              {this.state.task &&
                <div className="ml-2">
                  {this.state.task.description}
                </div>
              }
            </div>

        </div>

      </div>
    );
  }
}
