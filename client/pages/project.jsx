import React from 'react';
import Stage from '../components/stage';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      tasks: []
    };
  }

  componentDidMount() {
    fetch(`/api/projects/${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ tasks: result }));

    fetch(`/api/projects/titles/${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ project: result }));
  }

  render() {
    const stageTitles = ['Current', 'For Review', 'Completed', 'Back Log'];
    return (
      <div>
        <div className="container-fluid mt-3">

          <div>
            {this.state.project &&
              <div>
                <h2>{this.state.project.projectName}</h2>
              </div>
            }
          </div>

          <div className="status-scroll">
            {
              this.state.tasks.map((stage, index) => {
                return <Stage key={stage.taskId} title={stageTitles[index]} tasks={stage} />;
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
