'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');

process.env.MONGOLABL_URI = 'mongodb://localhost/test';
const server = require(__dirname + '/../lib/server');
const Kitty = require(__dirname + '/../model/schema');

describe('The cat API', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all the cats', (done) => {
    request('localhost:5000')
    .get('/cat')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body.data)).to.eql(true);
      done();
    });
  });

  it('should be able to create a cat with post', (done) => {
    request('localhost:5000')
    .post('/cat')
    .send({ quote: 'Durant blows' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.data.quote).to.eql('Durant blows');
      expect(res.body.data).to.have.property('_id');
      done();
    });
  });

  describe('rest requests for cats already in the db', () => {
    let testCat;

    beforeEach((done) => {
      let newCat = new Kitty({ name: 'test', gender: 'male' });
      newCat.save((err, kitty) => {
        testCat = kitty;
        done();
      });
    });

    it('should be able to delete a cat', (done) => {
      request('localhost:5000')
      .delete('/cat/' + testCat._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('Poor kitty has run out of nine lives');
        done();
      });
    });

    it('should be able to update a cat', (done) => {
      request('localhost:5000')
      .put('/cat/' + testCat._id)
      .send({ name: 'test' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('They must have nine lives!');
        done();
      });
    });
  });
  // debugger;
});
