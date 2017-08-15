// POST post route
server.post('/posts', (req, res) => {
  const _id = req.body._id;
  const text = req.body.text;
  console.log(_id, text);

  if (!_id || !text) {
    res.status(STATUS_USER_ERROR)
    res.json({ error: 'must provide "id" and "text"' });
    return;
  }
  const post = new Post({ text, _id });
  post.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } res.json(post);
  });
});

// GET all posts by user route
server.get('/posts', (req, res) => {
  Post.find({ _creator: req.body._id }).then((posts) => {
    res.json({posts});
  }, (err) => {
    res.status(400).json(err);
  });
});