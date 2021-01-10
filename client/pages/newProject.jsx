import React from 'react';

export default class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    const token = window.localStorage.getItem('user-jwt');
    fetch('/api/users', { headers: { 'X-Access-Token': token } })
      .then(res => res.json())
      .then(result => {
        this.setState({ users: this.state.users.concat(result) });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('user-jwt');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/projects/create', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = `#newTask?projectId=${result.projectId}`;
      });

  }

  render() {
    return (
      <div>
        <div className="container-fluid mt-3">
          <h2>Create Project</h2>

          <form className="mt-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h6>Project Name</h6>
              <input type="text" className="form-control" id="taskName" onChange={this.handleChange} name="projectName" />
            </div>

            <button type="submit" className="btn btn-danger mt-2">Submit</button>

          </form>
        </div>
      </div>
    );
  }
}
