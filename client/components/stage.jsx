import React from 'react';

export default class Stage extends React.Component {
  render() {
    return (
      <div className="d-inline-block">
        <div className="card mr-4">
          <div className="card-body">
            <h4>{this.props.title}</h4>
            {
              this.props.tasks.map(task => {
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
        </div>
      </div>
    );
  }
}
