import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {

  render() {
    const { handleLogout } = this.context;
    return (
      <div>
        <nav className="navbar navbar-expand-xl navbar-color navbar-height">
          <a href="#home">
            <i className="fas fa-brain white fa-2x"></i>
          </a>
          <div className="navbar-color">
            <DropdownButton id="dropdown-basic-button" bsPrefix="navbar-color white menu" variant="secondary" title="Menu">
              <Dropdown.Item href="#newProject">Create Project</Dropdown.Item>
            </DropdownButton>
          </div>

          <a href="">
            <i className="fas fa-sign-out-alt fa-2x white" onClick={handleLogout}></i>
          </a>
        </nav>
      </div>

    );
  }
}
Navbar.contextType = AppContext;
