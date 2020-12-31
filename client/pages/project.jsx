import React from 'react';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      tasks: []
    };
  }

  componentDidMount() {
    fetch(`/api/projects/${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ tasks: result }));

    fetch(`/api/projects/titles/${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ project: this.state.project.concat(result) }));
  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-3">

          <div>
            {
              this.state.project.map(projectDetail => (
                <div key={projectDetail.projectId} >
                  {
                    <div>
                      <h2 className="homepage-font mt-4 mb-4">{projectDetail.projectName}</h2>
                    </div>
                  }
                </div>
              ))
            }
          </div>

          <div className="status-scroll">
            <div className="status">
              <div className="card mr-4">
                <div className="card-body">
                  <h4>Current Tasks</h4>
                  {
                    this.state.tasks.map((stage, index) => {
                      if (index === 0) {
                        return (
                          <div key={stage.taskId}>
                            {
                              stage.map(task => {
                                return (
                                  <div key={task.taskId}>
                                    <a href={`#task?projectId=${task.projectId}&taskId=${task.taskId}`} className="card mt-3 d-block navbar-color">
                                      <div className="card-body white">
                                        <h5>{task.taskName}</h5>
                                        <h6>{task.username}</h6>
                                        <div className="row d-flex justify-content-between">
                                          <h6 className="ml-3">{task.dateCreated}</h6>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                );
                              })
                            }
                          </div>
                        );
                      } else {
                        return (
                          <div></div>
                        );
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="status">
              <div className="card mr-4">
                <div className="card-body">
                  <h4>For Review</h4>
                  {
                    this.state.tasks.map((stage, index) => {
                      if (index === 1) {
                        return (
                          <div key={stage.taskId}>
                            {
                              stage.map(task => {
                                return (
                                  <div key={task.taskId}>
                                    <a href={`#task?projectId=${task.projectId}&taskId=${task.taskId}`} className="card mt-3 d-block navbar-color">
                                      <div className="card-body white">
                                        <h5>{task.taskName}</h5>
                                        <h6>{task.username}</h6>
                                        <div className="row d-flex justify-content-between">
                                          <h6 className="ml-3">{task.dateCreated}</h6>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                );
                              })
                            }
                          </div>
                        );
                      } else {
                        return (
                          <div></div>
                        );
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="status">
              <div className="card mr-4">
                <div className="card-body">
                  <h4>Completed</h4>
                  {
                    this.state.tasks.map((stage, index) => {
                      if (index === 2) {
                        return (
                          <div key={stage.taskId}>
                            {
                              stage.map(task => {
                                return (
                                  <div key={task.taskId}>
                                    <a href={`#task?projectId=${task.projectId}&taskId=${task.taskId}`} className="card mt-3 d-block navbar-color">
                                      <div className="card-body white">
                                        <h5>{task.taskName}</h5>
                                        <h6>{task.username}</h6>
                                        <div className="row d-flex justify-content-between">
                                          <h6 className="ml-3">{task.dateCreated}</h6>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                );
                              })
                            }
                          </div>
                        );
                      } else {
                        return (
                          <div></div>
                        );
                      }
                    })
                  }
                </div>
              </div>
            </div>
            <div className="status">
              <div className="card mr-4">
                <div className="card-body">
                  <h4>Backlog</h4>
                  {
                    this.state.tasks.map((stage, index) => {
                      if (index === 3) {
                        return (
                          <div key={stage.taskId}>
                            {
                              stage.map(task => {
                                return (
                                  <div key={task.taskId}>
                                    <a href={`#task?projectId=${task.projectId}&taskId=${task.taskId}`} className="card mt-3 d-block navbar-color">
                                      <div className="card-body white">
                                        <h5>{task.taskName}</h5>
                                        <h6>{task.username}</h6>
                                        <div className="row d-flex justify-content-between">
                                          <h6 className="ml-3">{task.dateCreated}</h6>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                );
                              })
                            }
                          </div>
                        );
                      } else {
                        return (
                          <div></div>
                        );
                      }
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
