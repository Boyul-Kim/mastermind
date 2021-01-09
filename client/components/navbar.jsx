import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-xl navbar-color navbar-height">
        <a href="#Home">
          <i className="fas fa-brain white fa-2x"></i>
        </a>
      </nav>
    );
  }
}
