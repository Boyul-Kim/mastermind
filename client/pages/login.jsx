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
        <div className='row d-flex justify-content-center align-items-center container-child'>
          <h1 className="ml-4 white">Mastermind</h1>
          <i className="ml-4 fas fa-brain brain-white"></i>

          <div className="ml-4">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="white">Username</label>
                <input type="text" className="form-control mb-3" id="username" name="username" defaultValue="demoUser" />
                <label htmlFor="password" className="white">Password</label>
                <input type="password" className="form-control mb-3" id="password" name="password" defaultValue="test123" />
                <button type="submit" className="btn btn-danger input-length mt-3">Log in</button>
              </div>
            </form>
          </div>

        </div>
      </div>

    );
  }
}
Login.contextType = AppContext;
