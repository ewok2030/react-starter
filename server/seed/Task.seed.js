import Task from '../models/Task.model';
import TaskData from './Task.data';

/* eslint-disable no-console */
export default function () {
  Task.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    console.log('Seeding Tasks...');
    Task.create(TaskData, (error) => {
      if (!error) {
        console.log('Task seeding complete!');
      } else {
        console.log(`Task seed error: ${error.message}`);
      }
    });
  });
}
