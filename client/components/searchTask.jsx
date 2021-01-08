import React from 'react';

export default class SearchTask extends React.Component {

  render() {
    return (
      <div>
        <div>
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
    );
  }
}
