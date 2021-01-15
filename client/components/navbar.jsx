import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import AppContext from '../lib/app-context';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: false
    };
    this.handleNav = this.handleNav.bind(this);
  }

  handleNav() {
    this.setState({ sidebar: !this.state.sidebar });
  }

  render() {
    const { handleLogout } = this.context;
    if (this.state.sidebar) {
      return (
        <div>
          <nav className="navbar navbar-color navbar-height d-flex .relative ">
            <div className="sidebar-nav-on">
              <div className="white">test</div>
            </div>

            <i className="fas fa-bars white fa-2x" onClick={this.handleNav}></i>

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
    return (
      <div>
        <nav className="navbar navbar-color navbar-height d-flex .relative ">
          <div className="sidebar"></div>
          <i className="fas fa-bars white fa-2x" onClick={this.handleNav}></i>

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
