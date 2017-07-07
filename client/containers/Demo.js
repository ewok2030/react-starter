import React from 'react';
import { connect } from 'react-redux';
// Components
import Example from '../components/Example/Example';
// Action Creators
import { getPost } from '../redux/modules/post';

// Map store state to component's properties (see redux/store.js for names of modules)
const mapStateToProps = state => ({
  post: state.post.active,
});

// Map actions to component's properties
const mapDispatchToProps = dispatch => ({
  getPost: (id) => {
    dispatch(getPost(id));
  },
});

// @connect decorator binds the above to the class' properties
@connect(mapStateToProps, mapDispatchToProps)
export default class Demo extends React.Component {
  // Properties must be defined for the props attached via @connect decorator
  static propTypes = {
    post: React.PropTypes.object.isRequired,
    getPost: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      viewTitle: 'Example',
    };
    // Constructor is called before render()
    this.props.getPost('example');
  }

  handleClick = () => {
    /* eslint-disable */
    // shouldn't use browser's alert function, should use a modal instead
    alert(`clicked!`);
    /* eslint-enable */
  }

  render() {
    return (
      <div>
        <h2>{this.state.viewTitle}</h2>
        <Example title={this.props.post !== null ? this.props.post.title : null} onClick={this.handleClick} />
      </div>
    );
  }
}
