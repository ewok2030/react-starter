import Task from '../models/Task.model';

const task1 = new Task({ title: 'Task One', status: 'New', dateCreated: new Date(), tags: ['foo', 'bar', 'test'] });
const task2 = new Task({ title: 'Task Two', status: 'Active', dateCreated: new Date() });
const task3 = new Task({ title: 'Task Three', status: 'New', dateCreated: new Date() });

export default [task1, task2, task3];
