let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
chai.should();
chai.use(chaiHttp);
let testData = require('../test/testData.json');
let token = '';
let falseToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhdG1hbjJAZ21haWwuY29tIiwicGFzc3dvcmQiOiJCYXRtYW5AMjUzMiIsImlhdCI6MTYyNjE1MTA3MX0.6rkbk4P7WDklozsy3Fux-wSWtt3UyOyVa5'

describe('POST /registerUser',()=>{
    it('should return 200 responce on successfull user registration',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(testData.userData)
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
            .send(testData.falseData)
            .end((error,res)=>{
                res.should.have.status(422);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });

    it('should return 500 responce on duplicate mail address',(done)=>{
        chai.request(server)
            .post('/registerUser')
            .send(testData.userData)
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
            .send(testData.userLogin)
            .end((error,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('token');
                token = res.body.token;
            done();
            });
    });

    it('should return 404 responce on failed user login',(done)=>{
        chai.request(server)
            .post('/login')
            .send(testData.falseLogin)
            .end((error,res)=>{
                res.should.have.status(404);
                res.body.should.have.property('success').eq(false);
            done();
            });
    });
});

describe('POST /empPayroll',()=>{
    it('should return 200 status code on successful storing data',(done)=>{
        chai.request(server)
            .post('/empPayroll')
            .send(testData.userData)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('data');
            done();
            })
    })

    it('should return 422 status code on invalid employee details',(done)=>{
        chai.request(server)
            .post('/empPayroll')
            .send(testData.falseData)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(422);
                res.body.should.have.property('success').eq(false);
            done();
            })
    })
})

describe('GET /getEmpPayroll',()=>{
    it('should return all the employees in database with 200 status code',(done)=>{
        chai.request(server)
            .get('/getEmpPayroll')
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()    
            })
    })

    it('should give status code 402 for invalid token',(done)=>{
        chai.request(server)
            .get('/getEmpPayroll')
            .set('token',falseToken)
            .end((error,res)=>{
                res.should.have.status(402)
                res.body.should.have.property('success').eq(false)
            done()    
            })
    })
})

describe('GET emp by ID /getEmpPayrollByID',()=>{
    it('should get emp using employee id and give status code 200',(done)=>{
        let id = '60ed1e461d2bc78976dea7fb'
        chai.request(server)
            .get('/getEmpPayrollByID/'+id)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()    
            })
    })

    it('should return status code 500 on wrong employee ID',(done)=>{
        let id = '60ed1e461d2bc78976dea7f'
        chai.request(server)
            .get('/getEmpPayrollByID/'+id)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(500)
                res.body.should.have.property('success').eq(false)
            done()    
            })
    })
})

describe(' PUT by ID /updateEmpPayroll',()=>{
    it('should give status code 200 on successfull update',(done)=>{
        let id = '60ed1e461d2bc78976dea7fb'
        chai.request(server)
            .put('/updateEmpPayroll/'+id)
            .send(testData.userData)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()
            })
    })

    it('should give status code 500 on unsuccessfull update',(done)=>{
        let id = '60ed1e461d2bc78976dea7f'
        chai.request(server)
            .put('/updateEmpPayroll/'+id)
            .send(testData.userData)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(500)
                res.body.should.have.property('success').eq(false)
            done()
            })
    })
})

describe('DELETE emp by ID /deleteEmpPayroll',()=>{
    it('should get status code 200 on employee delete',(done)=>{
        let id = '60ed1e461d2bc78976dea7fb'
        chai.request(server)
            .delete('/deleteEmpPayroll/'+id)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(200)
                res.body.should.have.property('success').eq(true)
            done()    
            })
    })

    it('should return status code on wrong employee ID',(done)=>{
        let id = '60ed1e461d2bc78976dea7f'
        chai.request(server)
            .delete('/deleteEmpPayroll/'+id)
            .set('token',token)
            .end((error,res)=>{
                res.should.have.status(500)
                res.body.should.have.property('success').eq(false)
            done()    
            })
    })
})
