import React from 'react';

export default class Login extends React.Component {

  render() {
    return (
      <div className='container-fluid background-color'>
        <div className='row d-flex justify-content-center align-items-center container-child'>
          <h1 className="no-margins white">Mastermind</h1>
          <i className="no-margins fas fa-brain brain-white"></i>

          <div className="no-margins">
            <form action="">
              <div className="form-group">
                <input type="text" className="form-control margin-bottom" id="usernameInput" placeholder="Username" />
                <input type="password" className="form-control margin-bottom" id="passwordInput" placeholder="Password" />
                <button type="submit" className="btn btn-danger input-length">Log in</button>
              </div>
            </form>
          </div>

        </div>
      </div>

    );
  }
}
