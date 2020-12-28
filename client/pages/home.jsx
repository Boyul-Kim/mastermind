import React from 'react';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  render() {
    return (
      <div>test</div>
    );
  }
}
Home.contextType = AppContext;
