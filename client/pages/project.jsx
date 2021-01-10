import React from 'react';
import Stage from '../components/stage';
import SearchTask from '../components/searchTask';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      tasks: [],
      search: false,
      taskName: '',
      searchTasks: []
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSearch() {
    this.setState({ search: !this.state.search });
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/task/search/${this.props.projectId}/${this.state.taskName}`, { headers: { 'X-Access-Token': token } })
      .then(res => res.json())
      .then(result => this.setState({ searchTasks: result }));

  }

  handleChange(event) {
    const { name, value } = event.target;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  handleClear() {
    this.setState({ search: !this.state.search });
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch(`/api/projects/${this.props.projectId}`, { headers: { 'X-Access-Token': token } })
      .then(res => res.json())
      .then(result => this.setState({ tasks: result }));

    fetch(`/api/projects/titles/${this.props.projectId}`, { headers: { 'X-Access-Token': token } })
      .then(res => res.json())
      .then(result => this.setState({ project: result }));
  }

  render() {
    const stageTitles = ['Current', 'For Review', 'Completed', 'Back Log'];
    if (this.state.search) {
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
            <div>
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex justify-content-between">
                    <h4 className="ml-3">Search Result</h4>
                    <button type="submit" className="btn btn-primary mb-2 mr-3" onClick={this.handleClear}>Clear</button>
                  </div>

                  <SearchTask tasks={this.state.searchTasks} />
                </div>
              </div>
            </div>

          </div>
        </div>

      );
    }
    return (
      <div className="container-fluid mt-3">
        <div>
          {this.state.project &&
            <div>
              <h2>{this.state.project.projectName}</h2>
            </div>
          }
        </div>

        <form onSubmit={this.handleSearch}>
          <div className="form-row mb-2">
            <div className="col-10">
              <input type="text" className="form-control" name="taskName" placeholder="Search task" onChange={this.handleChange} />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Go!</button>
          </div>
        </form>

        <div className="status-scroll">
          {
            this.state.tasks.map((stage, index) => {
              return <Stage key={stage.taskId} title={stageTitles[index]} tasks={stage} projectId={this.props.projectId}/>;
            })
          }
        </div>
      </div>
    );
  }
}
