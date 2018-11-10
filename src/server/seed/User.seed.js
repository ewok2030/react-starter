import User from '../models/User.model';
import UserData from './User.data';

/* eslint-disable no-console */
export default function () {
  User.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    console.log('Seeding Users...');
    User.create(UserData, (error) => {
      if (!error) {
        console.log('User seeding complete!');
      } else {
        console.log(`User seed error: ${error.message}`);
      }
    });
  });
}
