import React from 'react';
import { connect } from 'react-redux';
// Components
import TaskList from '../components/TaskList/TaskList';
import TaskForm from '../components/TaskForm/TaskForm';
// Action Creators
import { getTask, getTasks } from '../redux/modules/task';

// Map store state to component's properties (see redux/store.js for names of modules)
const mapStateToProps = state => ({
  activeTask: state.task.active,
  isLoading: state.task.isLoading,
  tasks: state.task.list,
});

// Map actions to component's properties
const mapDispatchToProps = dispatch => ({
  getTasks: () => {
    dispatch(getTasks());
  },
  getTask: (id) => {
    dispatch(getTask(id));
  },
});

// @connect decorator binds the above to the class' properties
@connect(mapStateToProps, mapDispatchToProps)
export default class Tasks extends React.Component {
  static propTypes = {
    // redux store properties mapped to this class via @connect()
    activeTask: React.PropTypes.object,
    isLoading: React.PropTypes.bool.isRequired,
    tasks: React.PropTypes.array.isRequired,

    // redux action creators mapped to this class via @connect()
    getTasks: React.PropTypes.func.isRequired,
    getTask: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    activeTask: null,
  }

  // Constructor is called before render()
  constructor(props) {
    super(props);
    this.state = {
      viewTitle: 'Tasks',
    };

    /*
      Calling getTasks() action creator will dispatch the GET_TASKS action,
      and eventually the GET_TASKS_SUCCESS or GET_TASKS_ERROR action when the
      call to the API is complete. The task reducer will change state based on
      the actions.

      Changes to the redux store will change this container's properties via @connect()
      decorator, which will re-call this classes render() method.
    */
    this.props.getTasks();
  }

  /*
    This class property must return a function (not just be a function)
    in order to be bound to 'this', if not then function must be static.
  */
  handleTaskSelect = (taskId) => {
    this.props.getTask(taskId);
  }

  handleTaskSave = (task) => {
    alert(`Updating is not implemented: redux-form provided the following:\n${JSON.stringify(task)}`);
    // this.props.updateTask(taskId);
  }

  renderForm() {
    if (this.props.isLoading === true) {
      return (
        <div className="well">
          <small>Loading! Please wait...</small>
        </div>
      );
    } else if (this.props.activeTask === null) {
      return (
        <div className="well">
          <small>Select a task to edit</small>
        </div>
      );
    }
    const statusOptions = [
      {
        _id: '1',
        label: 'New',
      }, {
        _id: '2',
        label: 'Open',
      }, {
        _id: '3',
        label: 'Active',
      }, {
        _id: '4',
        label: 'Completed',
      },
    ];
    return (<TaskForm statusList={statusOptions} initialValues={this.props.activeTask} onSave={this.handleOnSave} />);
  }

  render() {
    return (
      <div>
        <h2>{this.state.viewTitle}</h2>
        <div className="col-md-4">
          <TaskList tasks={this.props.tasks} onClick={this.handleTaskSelect} activeTask={this.props.activeTask} />
        </div>

        <div className="col-md-8">
          {this.renderForm()}
        </div>
      </div>
    );
  }
}
