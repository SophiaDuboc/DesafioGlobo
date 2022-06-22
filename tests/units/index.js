
var chai = require('chai');
var chaiHttp = require('chai-http');
var router = require("../../routes/index.js");
var FormData = require('form-data');
chai.should();

chai.use(chaiHttp);

describe('/ Criar URL', function(){
    it('Deve retornar URL encurtada', async () => {
        await chai.request(router)
        .post('/')
        .send(setParams("Encurtar"))
        .end(function(error, res) {
            res.should.have.status(200);
            res.body.should.have.property('urlCriada');
        })
    })
});

describe('/ Listar URL', function(){
    it('Deve retornar array de URLs', async () => {
       return await chai.request(router).get('/')
       .then((res) => { 
        res.should.have.status(200);
        res.body.should.be.a("array");

        })
    })
});

describe('/ Excluir URL', function(){
    it('Deve retornar json sucesso', async () => {
        const res = await chai.request(router)
        .post('/')
        .send(setParams("Excluir"));
        res.should.have.status(200);
        res.body.to.be("json");
        res.body.should.have.property('acknowledged');
        res.body.errors.paginas.should.have.property('acknowledged').eql(true);

        })
    });

function setParams(acao){
    let formData = new FormData();
    formData.append("acao", acao);
    formData.append("url","https://twitter.com/legadodekonoha/status/1536086436499316736");
    return new URLSearchParams(formData);
}

