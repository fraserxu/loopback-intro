function Meetup(db) {
  this.db = db;
}

Meetup.prototype.get = function (name, callback) {
  var db = this.db;

  db.get(name, function(err, body) {
    callback(err, body)
  })
}

Meetup.prototype.create = function (name, callback) {
  var db = this.db;

  db.insert({
    name: 'shanghai javascript meetup ' + name + ' edition',
    date: name,
    venue: 'Wiredcraft office'
  }, name, function(err, body, header) {
    callback(err, body)
  })
}

Meetup.prototype.update = function (name, callback) {
  var db = this.db;

  db.get(name, function(err, body, header) {
    body.name += ' [updated]'

    db.insert(body, function(err, result) {
      callback(err, result)
    })
  })
}

Meetup.prototype.delete = function (name, callback) {
  var db = this.db;

  db.head(name, function(err, _, header) {
    var _rev = header.etag

    db.destroy(name, _rev, function(err, body) {
      callback(err, body)
    })

  })
}

module.exports = Meetup;
