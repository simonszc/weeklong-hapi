//router
'use strict'

const Kitty = require(__dirname + '/../model/schema.js')

module.exports = [{
  method:'GET',
  path: '/cat',
  handler: function(req,res) {
    Kitty.find({}, (err,data) => {
      if (err)  {
        console.log(err)
        return res('Error on Get')
      }
      return res({
        statusCode: 200,
        message: 'All the Kitties are Here',
        data: data
      })
    })
  }
},{
  method:'POST',
  path: '/cat',
  handler: function(req,res) {
    let newKitty = new Kitty(req.payload);
    newKitty.save((err,res) => {
      if(err) {
        console.log(err)
        return res('Error on Post')
      }
      return res({
        statusCode:200,
        message: 'Created a new kitty',
        data: data
      })
    })
  }
}, {
  method:'PUT',
  path:'/cat/{catId}',
  handler: function(req,res) {
    Kitty.findOne({
      '_id': req.params.catId
    }, (err, cat) => {
      const name = cat.name;
      cat = req.payload;
      Kitty.update({
        _id: request.params.catId
      }, cat, (err) => {
        if(!err) {
          return res(name + ' must have nine lives');
        }
        return res('lucky cat');
      });
    } else {
      return res.status(500);
    }
  });

}, {
  method:'DELETE',
  path:'/cat/{catId}'
  handler: function(req,res) {
    Kitty.remove({
      _id: req.params.catId
    }, (err) => {
      if(err) {
        console.log(err);
        return res('Error on Delete');
      }
      return res('Poor kitty has run out of nine lives')
    })
  }
  
}]
