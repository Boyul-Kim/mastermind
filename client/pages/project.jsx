import React from 'react';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      details: []
    };
  }

  componentDidMount() {
    fetch(`/api/home/${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ project: result }));

    fetch(`/api/projects//${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ details: this.state.details.concat(result) }));
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-xl navbar-color navbar-height">
          <i className="fas fa-bars white fa-2x"></i>
        </nav>

        <div className="container-fluid mt-3">
          {
            this.state.details.map(detail => (
              <div key={detail.taskId}>
                <div>test</div>
              </div>
            ))
          }

          <div>
            <i className="fas fa-plus fa-2x row d-flex justify-content-center homepage-font mt-3"></i>
          </div>

        </div>

      </div>
    );
  }
}
