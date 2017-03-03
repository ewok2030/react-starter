import React from 'react';

export default class Example extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        <div className="container">
          <p className="text-muted">{this.props.title}</p>
        </div>
      </div>
    );
  }
}
