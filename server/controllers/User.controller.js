import User from '../models/User.model';

export function getUsers(req, res) {
  User.find().exec((err, docs) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(docs);
  });
}

export function getUser(req, res) {
  User.findById(req.params.id).exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(doc);
  });
}

export function addUser(req, res) {
  // Check for required fields
  if (!req.body.user.title || !req.body.user.status || !req.body.user.dateCreated) {
    res.status(403).end();
  }

  const newDoc = new User(req.body.user);

  newDoc.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function updateUser(req, res) {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  }, { new: true }).exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(doc);
  });
}

export function deleteUser(req, res) {
  // User.findByIdAndRemove(id, options, callback)
  User.findById(req.params.id).exec((err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    doc.remove(() => {
      res.status(200).end();
    });
  });
}
