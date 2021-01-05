import React from 'react';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      task: []
    };
  }

  componentDidMount() {
    fetch(`/api/tasks/view/${this.props.taskId}`)
      .then(res => res.json())
      .then(result => this.setState({ task: this.state.task.concat(result) }));
  }

  render() {
    return (
      <div className="container-fluid mt-3">
        <h2>View Task</h2>

        <div>
          {
          this.state.task.map(task => {
            return (
              <div key={task.taskId}>
                <h6>Task Name</h6>
                <div className="viewTask">
                  <div className="ml-2">
                    {task.taskName}
                  </div>
                </div>

                <h6>Status Name</h6>
                <div className="viewTask">
                  <div className="ml-2">
                    {task.statusName}
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-around">
                  <h6>Date Created</h6>
                  <h6>Deadline</h6>
                </div>

                <div className="d-flex flex-row justify-content-around">
                  <div className="viewTask">
                    <div className="ml-2">
                      {task.dateCreated}
                    </div>
                  </div>
                  <div className="viewTask">
                    <div className="ml-2">
                      {task.deadline}
                    </div>

                  </div>

                </div>

                <h6>Username</h6>
                <div className="viewTask">
                  <div className="ml-2">
                    {task.username}
                  </div>
                </div>

                <h6>Description</h6>
                <div className="viewTask">
                  <div className="ml-2">
                    {task.description}
                  </div>
                </div>

              </div>
            );
          })
          }
        </div>

      </div>
    );
  }
}
