var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var engines = require('consolidate');
var bodyParser = require('body-parser');
var app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect('mongodb://localhost:27017/video', function (err, db) {
  if (err) throw err;

  console.log('Successfully connected to MongoDB!');

  app.get('/', function (req, res) {
    res.render('index', {'name': 'Traveler!'})
  });

  app.get('/search', function(req,res) {
    res.render('search', {'name': 'Traveler!'})
  });

  app.post('/added_entry', function (req,res) {
    var movie = req.body;
    db.collection('movie').insertOne({'title': movie.title, 'year':Number(movie.year), 'imdb': movie.imdb})
    res.send('You sent ' + movie.title + ' which was made in ' + movie.year +
    ' and the IMDB page is http://www.imdb.com/title/' + movie.imdb +'/');
  });
  app.post('/entry_searched', function(req, res) {
    var title = req.body.title;

    db.collection('movie').find({'title': title}).toArray(function(err, docs) {

      if (docs[0] === undefined) {
        res.send('<h1>Movie not found! Go add <a href="/">it</a>!</h1>')
      } else {
        res.send('You searched for ' + docs[0].title + ' which was made in ' + docs[0].year +
        ' and the IMDB page is <a href="http://www.imdb.com/title/' + docs[0].imdb
        + '/">http://www.imdb.com/title/' + docs[0].imdb +'/</a>');
        console.log(docs[0]);
        res.send(docs);
    }})
  })

  app.listen(3000);
  console.log('Server running on port 3000');
})
