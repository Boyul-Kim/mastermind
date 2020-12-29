import React from 'react';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null
    };
  }

  componentDidMount() {
    fetch(`/api/home/${this.props.projectId}`)
      .then(res => res.json())
      .then(result => this.setState({ project: result }));
  }

  render() {
    return (
      <div>test</div>
    );
  }
}
