import React from 'react';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/signup', req)
      .then(res => res.json());
    window.location.hash = '';
  }

  render() {
    return (
      <div className='container-fluid background-color'>
        <div className='row d-flex justify-content-center align-items-center container-child'>
          <h1 className="ml-4 white">Mastermind</h1>
          <i className="ml-4 fas fa-brain brain-white"></i>

          <div className="ml-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control mb-3" id="username" name="username" placeholder="Username" onChange={this.handleChange} />
                <input type="password" className="form-control mb-3" id="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <input type="email" className="form-control mb-3" id="email" name="email" placeholder="Email" onChange={this.handleChange} />
                <button type="submit" className="btn btn-danger input-length">Submit</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }
}
