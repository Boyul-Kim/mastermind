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
                <h2 className="font-color">{detail.projectName}</h2>
              </div>
            ))
          }
          <form className="form-inline">
            <div className="form-group mb-2">
              <input type="text" className="form-control vw-90" id="searchBar" placeholder="Search task"/>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Go!</button>
          </form>

          <select className="custom-select custom-select-sm mb-3">
            <option defaultValue>Filter</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <div className="card">
            <div className="card-body">
              <h4>Current Tasks</h4>
              {
                this.state.details.map(detail => (
                  <div key={detail.taskId}>
                    <a href="" className="card mt-3 d-block navbar-color">
                      <div className="card-body white">
                        <h5>{detail.taskName}</h5>
                        <h6>{detail.username}</h6>
                        <h6>{detail.dateCreated}</h6>
                      </div>
                    </a>
                  </div>
                ))
              }
            </div>
          </div>

          <div>
            <i className="fas fa-plus fa-2x row d-flex justify-content-center homepage-font mt-3"></i>
          </div>

        </div>

      </div>
    );
  }
}
