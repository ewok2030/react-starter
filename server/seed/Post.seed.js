import Post from '../models/Post.model';

/* eslint-disable no-console */
export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    console.log('Seeding Posts...');
    const post1 = new Post({ title: 'Post One', status: 'New', dateCreated: new Date(), tags: ['foo', 'bar', 'test'] });
    const post2 = new Post({ title: 'Post Two', status: 'Active', dateCreated: new Date() });
    const post3 = new Post({ title: 'Post Three', status: 'New', dateCreated: new Date() });

    Post.create([post1, post2, post3], (error) => {
      if (!error) {
        console.log('Post seeding complete!');
      } else {
        console.log(`Post seed error: ${error.message}`);
      }
    });
  });
}
