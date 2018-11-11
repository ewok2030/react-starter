import User from '../models/User.model';

const user1 = new User({
  title: 'User One',
  status: 'New',
  dateCreated: new Date(),
  tags: ['foo', 'bar', 'test']
});
const user2 = new User({ title: 'User Two', status: 'Active', dateCreated: new Date() });
const user3 = new User({ title: 'User Three', status: 'New', dateCreated: new Date() });

export default [user1, user2, user3];
