import React from 'react';

export default class TaskListItem extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    description: React.PropTypes.string,
    isSelected: React.PropTypes.bool,
  }

  static defaultProps = {
    description: '',
    isSelected: false,
  }

  itemClicked = (event) => {
    event.preventDefault();
    this.props.onClick(this.props.id);
  }

  renderIcon() {
    switch (this.props.status) {
      case 'Closed':
        return (
          <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        );
      case 'Completed':
        return (
          <span className="glyphicon glyphicon-ok" aria-hidden="true" />
        );
      default:
        return (
          <span className="glyphicon glyphicon-asterisk" aria-hidden="true" />
        );
    }
  }

  render() {
    const isActive = ((this.props.isSelected != null) && (this.props.isSelected === true))
            ? 'active'
            : '';
    return (
      <button className={`list-group-item ${isActive}`} onClick={this.itemClicked}>
        <h4 className="list-group-item-heading">
          {this.renderIcon()}&nbsp;{this.props.title}
          <span className="label label-default pull-right">{this.props.status}</span>
        </h4>
        <p className="list-group-item-text">{this.props.description}</p>
      </button>
    );
  }
}