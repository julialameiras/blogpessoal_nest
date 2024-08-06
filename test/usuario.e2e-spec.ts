import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  
  let usuarioId: any;
  let token: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
      AppModule],      
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close(); //ao inves de ficar dando ctrl c para finalizar os testes, ele finaliza sozinho
  });

  it("01 - Deve Cadastrar um novo Usuário", async () => {
    const resposta = await request(app.getHttpServer()) //chama o app da linha 27
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(201) //201 significa create (http status)

    usuarioId = resposta.body.id;

  });

  it("02 - Não deve Cadastrar um Usuário Duplicado", async () => {
    await request(app.getHttpServer()) //pq só await e nao const resposta?
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(400) //http status; método expect pertence à biblioteca SuperTest

  });

  it("03 - Deve Autenticar um novo Usuário (Login)", async () => {
    const resposta = await request(app.getHttpServer()) 
    .post('/usuarios/logar')
    .send({
      usuario: 'root@root.com',
      senha: 'rootroot',
    })
    .expect(200) 

    token = resposta.body.token;

  })//no cookbook não há ponto e virgula... porque?

  it("04 - Deve listar todos os Usuários", async () => {
    return request(app.getHttpServer()) //porque return?
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)

  })//no cookbook está sem o ponto e vírgula ao final. checkar qual a relevancia

  it("05 - Deve Atualizar os Dados do Usuário", async () => {
    return request(app.getHttpServer()) 
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Administrador do Sistema',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: ' ',
    })
    .expect(200)
    .then(resposta => {
      expect("Administrador do Sistema").toEqual(resposta.body.nome); //metodo expect to equal é do framework jest
    })
  })

  it("06 - Deve Listar apenas um Usuário pelo id", async () => {
    return request(app.getHttpServer()) 
    .get(`/usuarios/${usuarioId}`)
    .set('Authorization', `${token}`)
    .send({})
    .expect(200)
    })
});
