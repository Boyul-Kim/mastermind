import React from 'react';
import Login from './pages/login';
import Home from './pages/home';
import Task from './pages/task';
import NewTask from './pages/newTask';
import EditTask from './pages/editTask';
import Project from './pages/project';
import NewProject from './pages/newProject';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('user-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleLogin(result) {
    const { user, token } = result;
    window.localStorage.setItem('user-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { path } = this.state.route;

    if (path === 'newProject') {
      return <NewProject />;
    }

    if (path === 'editTask') {
      const taskId = this.state.route.params.get('taskId');
      const projectId = this.state.route.params.get('projectId');
      return <EditTask taskId={taskId} projectId={projectId} />;
    }

    if (path === 'newTask') {
      const projectId = this.state.route.params.get('projectId');
      return <NewTask projectId={projectId}/>;
    }

    if (path === 'task') {
      const taskId = this.state.route.params.get('taskId');
      const projectId = this.state.route.params.get('projectId');
      return <Task taskId={taskId} projectId={projectId}/>;
    }

    if (path === 'project') {
      const projectId = this.state.route.params.get('projectId');
      return <Project projectId={projectId} />;
    }
    if (path === 'home') {
      return <Home />;
    }
    if (path === '') {
      return <Login />;
    }
    return <Login />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleLogin } = this;
    const contextValue = { user, route, handleLogin };

    return (

      <AppContext.Provider value={contextValue}>
        <nav className="navbar navbar-expand-xl navbar-color navbar-height">
          <a href="#home">
            home
          </a>
        </nav>

        {this.renderPage()}
      </AppContext.Provider>

    );
  }
}
