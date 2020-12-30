import React from 'react';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    fetch(`/api/projects/${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ tasks: this.state.tasks.concat(result) }));
  }

  render() {

    return (
      <div>
        <div className="container-fluid mt-3">
          {
            this.state.tasks.slice(0, 1).map(task => (
              <div key={task.taskId}>
                <h2 className="font-color mb-3">{task.projectName}</h2>
              </div>
            ))
          }

          <div className="card">
            <div className="card-body">
              <h4>Current Tasks</h4>
              {
                this.state.tasks.map(task => (
                  <div key={task.taskId}>
                    {
                      <a href={`#task?projectId=${task.projectId}&taskId=${task.taskId}`} className="card mt-3 d-block navbar-color">
                        <div className="card-body white">
                          <h5>{task.taskName}</h5>
                          <h6>{task.username}</h6>
                          <div className="row d-flex justify-content-between">
                            <h6 className="ml-3">{task.dateCreated}</h6>
                          </div>

                        </div>
                      </a>
                    }
                  </div>
                ))
              }
            </div>
          </div>

        </div>

      </div>
    );
  }
}
