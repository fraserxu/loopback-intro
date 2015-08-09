var express = require('express')
var app = express()
var nano = require('nano')('http://localhost:5984')

// create a db to use
// nano.db.create('jsmeetup')

// destroy db
// nano.db.destroy('jsmeetup')

// use db
var jsmeetupdb = nano.db.use('jsmeetup')

// insert a record
// jsmeetupdb.insert({
//   name: 'shanghai javascript meetup august edition',
//   date: 'August 9th',
//   venue: 'Wiredcraft office'
// }, 'august', function(err, body, header) {
//   console.log('you have creaed the first record.')
// })

app.get('/', function(req, res) {
  res.send('it works')
})

// get
app.get('/meetup/:name', function(req, res) {
  var meetupname = req.params.name

  jsmeetupdb.get(meetupname, function(err, body) {
    res.send(body)
  })
})

// create
app.post('/meetup/:name', function(req, res) {
  var newmeetupname = req.params.name

  jsmeetupdb.insert({
    name: 'shanghai javascript meetup ' + newmeetupname + ' edition',
    date: newmeetupname,
    venue: 'Wiredcraft office'
  }, newmeetupname, function(err, body, header) {
    res.send(body)
  })
})

// update
app.put('/meetup/:name', function(req, res) {
  var meetupname = req.params.name

  jsmeetupdb.get(meetupname, function(err, body, header) {
    body.name += ' [updated]'

    jsmeetupdb.insert(body, function(err, result) {
      res.send('update ' + meetupname + ' success!')
    })
  })
})

// delete
app.delete('/meetup/:name', function(req, res) {
  var meetupname = req.params.name

  jsmeetupdb.head(meetupname, function(err, _, header) {
    var _rev = header.etag

    jsmeetupdb.destroy(meetupname, _rev, function(err, body) {
      res.send('delete ' + meetupname + ' success!')
    })
  })
})

var server = app.listen('3000', function() {
  console.log('Express server with nano example running...')
})
