var express = require('express');
var axios = require('axios');
var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/places', (req, res) => {
  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=[API_KEY_HERE]')
    .then(response => {
      console.log(response)
      res.send(response)
    })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

