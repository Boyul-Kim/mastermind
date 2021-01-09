import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
                <input type="text" className="form-control mb-3" id="username" name="username" placeholder="Username" onChange={this.handleChange} />
                <input type="password" className="form-control mb-3" id="password" name="password" placeholder="Password" onChange={this.handleChange} />
                <button type="submit" className="btn btn-danger input-length">Log in</button>
              </div>
            </form>
            <div>
              <a href="#signup" className="d-flex justify-content-center white">Sign up</a>
            </div>
          </div>

        </div>
      </div>

    );
  }
}
Login.contextType = AppContext;
