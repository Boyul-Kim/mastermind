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
    // fetch('/api/home', { method: 'GET' })
    //   .then(result => {
    //     // console.log(result);
    //     if (result.projectId && result.projectName) {
    //       this.setState({ projectName: result.projectName });
    //     }
    //   });
    this.setState({ mounted: true });
  }

  render() {
    // console.log(this.state.projects);
    // console.log((this.state.projects[0]));
    if (this.state.projectSelected) {
      return <Redirect to="project" />;
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-color">
          <i className="fas fa-bars white"></i>
        </nav>

        <div className="container-fluid">
          <h1>Projects</h1>

          <div onClick={this.handleProjectView} className="card">
            <div className="row card-body">
              <i className="fas fa-lightbulb fa-3x margin-1x"></i>
              <div>
                <h2 className="homepage-font"></h2>
              </div>
            </div>
          </div>

          <div>
            <i className="fas fa-plus fa-2x row d-flex justify-content-center homepage-font"></i>
          </div>

        </div>
      </div>
    );
  }
}
Home.contextType = AppContext;
