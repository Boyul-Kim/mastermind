import React from 'react';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {

    fetch('/api/home/projects', { method: 'GET' })
      .then(res => res.json())
      .then(result => {
        this.setState({ projects: this.state.projects.concat(result) });
      });
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-xl navbar-color navbar-height">
          <i className="fas fa-bars white fa-2x"></i>
        </nav>

        <div className="container-fluid mt-3">
          <h1 className="font-color">Projects</h1>

          <div>
            {
              this.state.projects.map(project => (
                <div key={project.projectId} >
                  {
                    <a href={`#project?projectId=${project.projectId}`} className="card mt-3 d-block">
                      <div className="row d-flex align-items-center card-body">
                        <i className="fas fa-lightbulb fa-3x m-3 icon-color"></i>
                        <div>
                          <h2 className="homepage-font">{project.projectName}</h2>
                        </div>
                      </div>
                    </a>
                  }
                </div>
              ))
            }
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
