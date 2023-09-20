// // eslint-disable-next-line import/no-extraneous-dependencies
// import request from 'supertest';

// import { app } from './app';

// async function createUser(name: string, email: string, password: string) {
//   const response = await request(app).post('/users').send({
//     name,
//     email,
//     password,
//   });
//   return response;
// }
// async function createSession(email: string, password: string) {
//   const response = await request(app).post('/session').send({
//     email,
//     password,
//   });
//   return response;
// }
// async function createPost(token: string) {
//   const response = await request(app).post('/post').set('Authorization', `Bearer ${token}`).send({
//     title: 'testando',
//     content: 'blablablablablablablablablablablablablablablablabl',
//   });
//   return response;
// }

// describe('Test all', () => {
//   it('Deve ser capaz de criar um usuário e criar um post', async () => {
//     const name = 'Hawk';
//     const email = 'test1@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(1);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test1@example.com');

//     const responseSecond = await createUser(name, email, password);
//     expect(responseSecond.statusCode).toEqual(401);

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//   });
//   it('Deve ser capaz de criar um usuário e atualizar ele', async () => {
//     const name = 'Hawk';
//     const email = 'test2@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(2);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test2@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responseUserUpdate = await request(app).put('/users').set('Authorization', `Bearer ${token}`).send({
//       name: 'Falcão Nasdasda',
//       password: '123',
//       old_password: '123',
//     });
//     expect(responseUserUpdate.statusCode).toEqual(200);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e apagar a postagem', async () => {
//     const name = 'Hawk';
//     const email = 'test3@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(3);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test3@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);

//     const responsePostDelete = await request(app)
//       .delete(`/post/${responsePostCreate.body.result.id}`)
//       .set('Authorization', `Bearer ${responseSession.body.result.token}`)
//       .send({});

//     expect(responsePostDelete.statusCode).toEqual(200);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e buscar por id a postagem', async () => {
//     const name = 'Hawk';
//     const email = 'test4@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(4);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test4@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//     const idPost = responsePostCreate.body.result.id;

//     const responsePosSearchId = await request(app)
//       .get(`/post/${idPost}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({});

//     expect(responsePosSearchId.statusCode).toEqual(200);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e atualizar a postagem', async () => {
//     const name = 'Hawk';
//     const email = 'test5@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(5);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test5@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//     const idPost = responsePostCreate.body.result.id;

//     const responsePostUpdate = await request(app)
//       .put(`/post/${idPost}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({ title: 'Novo titulo', content: 'tsctsc' });
//     expect(responsePostUpdate.statusCode).toEqual(200);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e buscar por um termo a postagem', async () => {
//     const name = 'Hawk';
//     const email = 'test6@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(6);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test6@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);

//     const responsePostUpdate = await request(app)
//       .get(`/post?search=${responsePostCreate.body.result.title}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({});
//     expect(responsePostUpdate.statusCode).toEqual(200);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e atualizar a postagem, error no token', async () => {
//     const name = 'Hawk';
//     const email = 'test7@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(7);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test7@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//     const idPost = responsePostCreate.body.result.id;
//     const invalidToken = 'invalid_token_here';

//     const responsePostUpdate = await request(app)
//       .put(`/post/${idPost}`)
//       .set('Authorization', `Bearer ${invalidToken}`)
//       .send({ title: 'Novo titulo', content: 'tsctsc' });
//     expect(responsePostUpdate.statusCode).toEqual(401);
//     // const errorText = responsePostUpdate.text.match(/Error: JWT Token invalid.*/);
//     // if (errorText) {
//     //   console.log(errorText[0]);
//     // } pode tirar depois
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e atualizar a postagem, erro no id', async () => {
//     const name = 'Hawk';
//     const email = 'test8@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(8);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test8@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//     const idPost = responsePostCreate.body.result.id;
//     console.log(idPost);

//     const responsePostUpdate = await request(app)
//       .put(`/post/2000`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({ title: 'Novo titulo', content: 'tsctsc' });

//     // console.log(responsePostUpdate.text); retirar depois d ver
//     expect(responsePostUpdate.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e atualizar a postagem, erro o post achado n é dele', async () => {
//     const name = 'Hawk';
//     const email = 'test9@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(9);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test9@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//     const idPost = responsePostCreate.body.result.id;
//     console.log(idPost);

//     const responsePostUpdate = await request(app)
//       .put(`/post/6`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({ title: 'Novo titulo', content: 'tsctsc' });

//     // console.log(responsePostUpdate.text); retirar depois d ver
//     expect(responsePostUpdate.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e buscar por um termo a postagem, erro n tem post', async () => {
//     const name = 'Hawk';
//     const email = 'test10@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(10);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test10@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);

//     const responsePostUpdate = await request(app)
//       .get(`/post?search=pedro`)
//       .set('Authorization', `Bearer ${token}`)
//       .send({});
//     expect(responsePostUpdate.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e buscar por id a postagem, erro n tem post', async () => {
//     const name = 'Hawk';
//     const email = 'test11@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(11);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test11@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//     const idPost = responsePostCreate.body.result.id;

//     const responsePosSearchId = await request(app).get(`/post/200`).set('Authorization', `Bearer ${token}`).send({});

//     expect(responsePosSearchId.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e buscar por id a postagem, o post n é dele', async () => {
//     const name = 'Hawk';
//     const email = 'test12@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(12);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test12@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);
//     const idPost = responsePostCreate.body.result.id;

//     const responsePosSearchId = await request(app).get(`/post/6`).set('Authorization', `Bearer ${token}`).send({});

//     expect(responsePosSearchId.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e apagar a postagem, erro pois a postagem n exist', async () => {
//     const name = 'Hawk';
//     const email = 'test13@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(13);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test13@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);

//     const responsePostDelete = await request(app)
//       .delete(`/post/200`)
//       .set('Authorization', `Bearer ${responseSession.body.result.token}`)
//       .send({});

//     expect(responsePostDelete.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e apagar a postagem, erro o post achado n é dele', async () => {
//     const name = 'Hawk';
//     const email = 'test14@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(14);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test14@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await createPost(token);
//     expect(responsePostCreate.statusCode).toEqual(200);

//     const responsePostDelete = await request(app)
//       .delete(`/post/6`)
//       .set('Authorization', `Bearer ${responseSession.body.result.token}`)
//       .send({});

//     expect(responsePostDelete.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar e criar sessão, erro no email', async () => {
//     const name = 'Hawk';
//     const email = 'test15@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(15);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test15@example.com');

//     const responseSession = await request(app).post('/session').send({
//       email: 'test200@example.com',
//       password: '123',
//     });
//     expect(responseSession.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar e criar sessão, erro na senha', async () => {
//     const name = 'Hawk';
//     const email = 'test16@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(16);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test16@example.com');

//     const responseSession = await request(app).post('/session').send({
//       email: 'test16@example.com',
//       password: '12345',
//     });
//     expect(responseSession.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um usuário e atualizar ele, erro email ja existente', async () => {
//     const name = 'Hawk';
//     const email = 'test17@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(17);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test17@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responseUserUpdate = await request(app).put('/users').set('Authorization', `Bearer ${token}`).send({
//       name: 'Falcão Nasdasda',
//       email: 'test17@example.com',
//       password: '123',
//       old_password: '123',
//     });
//     expect(responseUserUpdate.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um usuário e atualizar ele, erro n forneci a senha antiga', async () => {
//     const name = 'Hawk';
//     const email = 'test18@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(18);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test18@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responseUserUpdate = await request(app).put('/users').set('Authorization', `Bearer ${token}`).send({
//       name: 'Falcão Nasdasda',
//       password: '123',
//     });
//     expect(responseUserUpdate.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um usuário e atualizar ele, erro a senha antiga n confere', async () => {
//     const name = 'Hawk';
//     const email = 'test19@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(19);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test19@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responseUserUpdate = await request(app).put('/users').set('Authorization', `Bearer ${token}`).send({
//       name: 'Falcão Nasdasda',
//       password: '123',
//       old_password: '1234',
//     });
//     expect(responseUserUpdate.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um usuário e criar um post, erro ao criar o post', async () => {
//     const name = 'Hawk';
//     const email = 'test20@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(20);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test20@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await request(app).post('/post').set('Authorization', `Bearer ${token}`).send({
//       title: 1,
//       content: 'blablablablablablablablablablablablablablablablabl',
//     });
//     expect(responsePostCreate.statusCode).toEqual(401);
//   });
//   it('Deve ser capaz de criar um usuário e criar um post, erro sem token', async () => {
//     const name = 'Hawk';
//     const email = 'test21@example.com';
//     const password = '123';

//     const response = await createUser(name, email, password);
//     expect(response.statusCode).toEqual(200);
//     expect(response.body.result.id).toEqual(21);
//     expect(response.body.result.name).toEqual('Hawk');
//     expect(response.body.result.email).toEqual('test21@example.com');

//     const responseSession = await createSession(email, password);
//     expect(responseSession.statusCode).toEqual(200);
//     const token = responseSession.body.result.token;

//     const responsePostCreate = await request(app).post('/post').set(' ').send({
//       title: 'titles',
//       content: 'blablablablablablablablablablablablablablablablabl',
//     });
//     expect(responsePostCreate.statusCode).toEqual(401);
//     console.log(responsePostCreate.text);
//   });
// });
