import React from 'react';

export default class Example extends React.Component {
  // Properties which are to be injected during the constructor call
  static propTypes = {
    title: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
  }

  // Any propType without .isRequired must be initialized
  static defaultProps = {
    title: 'this is the defualt title',
  }

  constructor(props) {
    super(props); // must always call the parent's constructor
    // Operations to be carried out before render() go here

    /*
      Manage internal state of component via this.state = {...}
      No other components will know what this state is, since it's not registering with the redux store
    */
    this.state = {
      isEnabled: false,
    };
  }

  // Use this syntax to trick React into binding to this class instance
  handleClick = (event) => {
    event.preventDefault();
    // Call a function injected by the parent (don't build dependencies in components!)
    this.props.onClick(this.props.title);
  }

  handleChange = () => {
    // Updating the state will cause render() to be called and the DOM to update
    this.setState({
      isEnabled: !this.state.isEnabled,
    });
  }

  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <div className="checkbox">
          <label htmlFor="mycheckbox">
            <input id="mycheckbox" type="checkbox" checked={this.state.isEnabled} onClick={this.handleChange} /> Is Enabled?
          </label>
        </div>
        <button className="btn btn-default" onClick={this.props.onClick} disabled={!this.state.isEnabled}>Click Me!</button>
      </div>
    );
  }
}
