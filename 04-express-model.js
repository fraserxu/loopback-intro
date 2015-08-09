var express = require('express')
var app = express()

var Meetup = require('./03-simple-model');
var nano = require('nano')('http://localhost:5984')
var jsmeetupdb = nano.db.use('jsmeetup')

app.get('/', function(req, res) {
  res.send('it works')
})

// get
app.get('/meetup/:name', function(req, res) {
  var meetupname = req.params.name

  var jsmeetup = new Meetup(jsmeetupdb);

  jsmeetup.get(meetupname, function(err, result) {
    res.send(result)
  })
})

// create
app.post('/meetup/:name', function(req, res) {
  var newmeetupname = req.params.name

  var jsmeetup = new Meetup(jsmeetupdb);

  jsmeetup.create(newmeetupname, function(err, result) {
    res.send(result)
  })
})

// update
app.put('/meetup/:name', function(req, res) {
  var meetupname = req.params.name

  var jsmeetup = new Meetup(jsmeetupdb);

  jsmeetup.put(meetupname, function(err, result) {
    res.send(result)
  })
})

// delete
app.delete('/meetup/:name', function(req, res) {
  var meetupname = req.params.name

  var jsmeetup = new Meetup(jsmeetupdb);

  jsmeetup.delete(meetupname, function(err, result) {
    res.send(result)
  })
})

var server = app.listen('3000', function() {
  console.log('Express server with nano example running...')
})
