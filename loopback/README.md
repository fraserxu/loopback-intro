### Simple API

1. Create a new application

```
slc loopback
cd jsmeetup
```

2. Create a new model

```
slc loopback:model
```

3. Add properties

4. Checkout project structure

http://docs.strongloop.com/display/public/LB/Create+a+simple+API

### User API Explorer

### Connect API to datasource

http://docs.strongloop.com/display/public/LB/Connect+your+API+to+a+data+source

1. init

```
slc loopback:datasource
```

2. install connector

```
npm install loopback-connector-mongodb --save
```

3. prepare the database

create `meetup` db

```
use meetup
# add admin user to db and grant some role
db.createUser({ "user": "meetupAdmin", "pwd": "meetupPasswod", "roles": ["readWrite", "dbAdmin"] })
```
4. connect model to MongoDB `/server/model-config.json`

```
"Meetup": {
  "dataSource": "meetup-mongo",
  "public": true
}
```

5. Run it! `node .`

6. Explorer `http://0.0.0.0:3000/explorer/#!/Meetups/create`

```
{
  "date": "november",
  "venue": "people square",
  "name": "shanghai javascript meetup november edition"
}
```
