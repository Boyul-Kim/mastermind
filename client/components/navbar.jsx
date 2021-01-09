import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-xl navbar-color navbar-height">
        <a href="#home">
          <i className="fas fa-brain white fa-2x"></i>
        </a>
        <DropdownButton id="dropdown-basic-button" title="Menu">
          <Dropdown.Item href="#newProject">Create Project</Dropdown.Item>
          <Dropdown.Item href="">Log out</Dropdown.Item>
        </DropdownButton>
      </nav>
    );
  }
}
