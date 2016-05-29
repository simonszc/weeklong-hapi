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
    newKitty.save((err,data) => {
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
  method: 'PUT',
  path: '/cat/put/{catId}',
  handler: function(request, reply) {
  Kitty.findOne({
    '_id': request.params.catId
  }, (err, cat) => {
    if (!err) {
      const name = cat.name;
      member = request.payload;
      Kitty.update({
        _id: request.params.catId
        }, member, (err) => {
          if (!err) {
            return reply(name + 'is still meowing and scratching');
          }
          return reply('They must have nine lives!');
        });
      } else {
        return reply.status(500);
      }
    });
  }
}, {
  method:'DELETE',
  path:'/cat/{catId}',
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
