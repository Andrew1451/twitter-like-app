const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const { expect } = require('chai');
const should = chai.should();
chai.use(chaiHttp);
const request = require('supertest')(app);

// Tests home page. Need to authenticate user and test authenticated routes.

describe('Get index page', () => {
    it('should load index page', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});