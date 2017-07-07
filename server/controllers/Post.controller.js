import Post from '../models/Post.model';

export function getPosts(req, res) {
  Post.find().exec((err, docs) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(docs);
  });
}

export function getPost(req, res) {
  Post.findById(req.params.id).exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(doc);
  });
}

export function addPost(req, res) {
  // Check for required fields
  if (!req.body.post.title || !req.body.post.status || !req.body.post.dateCreated) {
    res.status(403).end();
  }

  const newDoc = new Post(req.body.post);

  newDoc.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function updatePost(req, res) {
  Post.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  }, { new: true }).exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(doc);
  });
}

export function deletePost(req, res) {
  // Post.findByIdAndRemove(id, options, callback)
  Post.findById(req.params.id).exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    doc.remove(() => {
      res.status(200).end();
    });
  });
}
