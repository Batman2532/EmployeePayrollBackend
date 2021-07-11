let chai = require('chai');
let chaiHttp = require('chai-http');
const { deleteById } = require('../app/models/employee');
let server = require('../server');
chai.should();
chai.use(chaiHttp);

const userData = {
    firstName : 'Saurabh',
    lastName : 'Charjan',
    email : 'charjan15@gmail.com',
    password : 'Batman@2532'
}
const falseData = {
    firstName : 'Saurabh',
    lastName : 'Charjan',
    email : 'charjan15@gmail.com',
    password : 'Batman532'
}
const userLogin = {
    email : 'batman4@gmail.com',
    password : 'Batman@2532'
}
const falseLogin = {
    email : 'batman@gmail.com',
    password : 'Batman2532'
}



describe('POST /registerUser',()=>{
    it('should return 200 responce on successfull user registration',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(userData)
            .end((error,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
            done();
            });
    });

    it('should return 422 responce on invalid user details',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(falseData)
            .end((error,res)=>{
                res.should.have.status(422);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });

    it('should return 500 responce on duplicate mail address',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(userData)
            .end((error,res)=>{
                res.should.have.status(500);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });
});

describe('POST /login',()=>{
    it('should return 200 responce on successfull user login',(done)=>{
        chai.request(server)
            .post('/login')
            .send(userLogin)
            .end((error,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('token');
            done();
            });
    });

    it('should return 404 responce on failed user login',(done)=>{
        chai.request(server)
            .post('/login')
            .send(falseLogin)
            .end((error,res)=>{
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });
});
