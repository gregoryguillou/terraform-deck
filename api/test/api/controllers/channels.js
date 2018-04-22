/* eslint-env mocha */

const should = require('should')
const request = require('supertest')
const server = require('../../../app')
const YAML = require('yamljs')
const apikey = YAML.load('config/settings.yaml').users[0].apikey

let token = ''

describe('channels', function () {
  before((done) => {
    request(server)
      .get('/login')
      .set('Accept', 'application/json')
      .set('Authorization', `Key ${apikey}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        token = 'Bearer ' + res.body['token']
        res.body.should.containEql({message: 'Authenticated'})
        done()
      })
  })

  it('GET /channels to list the default channel', (done) => {
    request(server)
      .get('/channels')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.containEql({
          channels: [
            {name: 'default'}
          ]
        })
        done()
      })
  })

  it('GET /channels/default to describe the default channel', (done) => {
    request(server)
      .get('/channels/default')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        done()
      })
  })

  it('PUT /channels/{channel} creates or update a channel', (done) => {
    request(server)
      .put('/channels/user1')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .expect(201)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.containEql({})
        done()
      })
  })

  it('GET /channels to all channels', (done) => {
    request(server)
      .get('/channels')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.containEql({
          channels: [
            {name: 'default'},
            {name: 'user1'}
          ]
        })
        done()
      })
  })

  it('GET /channels/{channel} to describe an existing channel', (done) => {
    request(server)
      .get('/channels/user1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        done()
      })
  })

  it('GET /channels/{channel} to describe an non-existing channel', (done) => {
    request(server)
      .get('/channels/user2')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        should.not.exist(err)
        done()
      })
  })

  it('PUT /channels/{channel} to update a channel with project/workspace', (done) => {
    request(server)
      .put('/channels/user1')
      .send({
        project: 'demonstration',
        workspace: 'staging'
      })
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .expect(201)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.containEql({})
        done()
      })
  })

  it('GET /channels/{channel} to describe a channel with a project/workspace', (done) => {
    request(server)
      .get('/channels/user1')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.containEql({
          project: 'demonstration',
          workspace: 'staging'
        })
        done()
      })
  })

  it('DELETE /channels/{channel} deletes an existing channel', (done) => {
    request(server)
      .del('/channels/user1')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .expect(204)
      .end((err, res) => {
        should.not.exist(err)
        done()
      })
  })

  it('GET /channels to list the default channel', (done) => {
    request(server)
      .get('/channels')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.containEql({
          channels: [
            {name: 'default'}
          ]
        })
        done()
      })
  })

  it('DELETE /channels/default deletes the default channel', (done) => {
    request(server)
      .del('/channels/default')
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .expect(204)
      .end((err, res) => {
        should.not.exist(err)
        done()
      })
  })

  it('GET /channels to list the default channel', (done) => {
    request(server)
      .get('/channels')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        should.not.exist(err)
        res.body.should.containEql({
          channels: [
            {name: 'default'}
          ]
        })
        done()
      })
  })
})
