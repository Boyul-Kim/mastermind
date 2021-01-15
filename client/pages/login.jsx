import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'demoUser',
      password: 'test123'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    fetch('/api/login', req)
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          const { handleLogin } = this.context;
          handleLogin(result);
        }
      });
  }

  render() {

    const { user } = this.context;

    if (user) return <Redirect to="home" />;

    return (
      <div className='container-fluid background-color'>

        <div className="row justify-content-center h-100 align-items-center">
          <div>
            <h1 className="col white">Mastermind</h1>
            <i className="fas fa-brain brain-white col mt-3"></i>

            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="username" className="white">Username</label>
                  <input type="text" className="form-control mb-3 input-length" id="username" name="username" defaultValue="demoUser" disabled />
                  <label htmlFor="password" className="white">Password</label>
                  <input type="password" className="form-control input-length mb-3" id="password" name="password" defaultValue="test123" disabled />
                  <button type="submit" className="btn btn-danger input-length mt-3">Log in</button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>

    );
  }
}
Login.contextType = AppContext;
