import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectSelected: false,
      mounted: false
    };
    this.handleProjectView = this.handleProjectView.bind(this);
  }

  handleProjectView() {
    this.setState({ projectSelected: !this.state.projectSelected });
  }

  componentDidMount() {

    fetch('/api/home/project', { method: 'GET' })
      .then(res => res.json())
      .then(result => {
        this.setState({ projects: this.state.projects.concat(result) });
      });
    this.setState({ mounted: true });
  }

  render() {
    const projectList = this.state.projects.map(project =>
      <div key={project.projectId} >
        {
          <div onClick={this.handleProjectView} className="card mt-3">
            <div className="row d-flex align-items-center card-body">
              <i className="fas fa-lightbulb fa-3x m-3 icon-color"></i>
              <div>
                <h2 className="homepage-font">{project.projectName}</h2>
              </div>
            </div>
          </div>
        }
      </div>
    );

    if (this.state.projectSelected) {
      return <Redirect to="project" />;
    }

    return (
      <div>
        <nav className="navbar navbar-expand-xl navbar-color navbar-height">
          <i className="fas fa-bars white fa-2x"></i>
        </nav>

        <div className="container-fluid mt-3">
          <h1 className="font-color">Projects</h1>

          <div>
            {projectList}
          </div>

          <div>
            <i className="fas fa-plus fa-2x row d-flex justify-content-center homepage-font mt-3"></i>
          </div>

        </div>
      </div>
    );
  }
}
Home.contextType = AppContext;
