module.exports = function(app) {
  var express = require('express');
  var projectRouter = express.Router();

  projectRouter.get('/posts', function(req, res) {
    var delay = req.query.id;
    console.log('===', req.query, '===');

    setTimeout(function () {
      res.send({posts: [{id: delay}]});
    }, delay * 100);
  });

  app.use('/', projectRouter);
};
