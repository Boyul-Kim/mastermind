import React from 'react';

export default class NotFound extends React.Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col text-center mb-5">
            <h3>
              Sorry, we could not find the page you were looking for.
            </h3>
            <h6>Please press the brain icon to return home.</h6>
          </div>
        </div>
      </div>
    );
  }
}
