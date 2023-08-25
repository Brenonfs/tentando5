// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';

import { app } from './app';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnauthorizedError } from './helpers/api-erros';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateUserService } from './services/UserService/createUser.service';

describe('Test all', () => {
  it('Deve ser capaz de criar um usuário e criar um post', async () => {
    const response = await request(app).post('/users').send({
      name: 'Hawk',
      email: 'test23@example.com',
      password: '123',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result.id).toEqual(1);
    expect(response.body.result.name).toEqual('Hawk');
    expect(response.body.result.email).toEqual('test23@example.com');

    console.log('Response Status Code:', response.statusCode);

    // let errorCaught = false;
    // try {
    //   const responseSecond = await request(app).post('/users').send({
    //     name: 'Hawk',
    //     email: 'test23@example.com',
    //     password: '123',
    //   });

    //   expect(responseSecond.statusCode).toEqual(401); // Assuming 401 is the correct status code for UnauthorizedError

    //   // Additional checks if needed
    // } catch (error) {
    //   console.log(error);
    //   // Check if the caught error is an instance of UnauthorizedError
    //   if (error instanceof UnauthorizedError && error.message === 'Este email ja está em uso.') {
    //     errorCaught = true;
    //   }
    // }

    const responseSession = await request(app).post('/session').send({
      email: 'test23@example.com',
      password: '123',
    });

    expect(responseSession.statusCode).toEqual(200);

    console.log('Response Status Code:', responseSession.statusCode);

    const responsePostCreate = await request(app)
      .post('/post')
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({
        title: 'testando',
        content: 'blablablablablablablablablablablablablablablablabl',
      });

    expect(responsePostCreate.statusCode).toEqual(200);

    console.log('Response Status Code:', responsePostCreate.statusCode);
  });
  it('Deve ser capaz de criar um usuário e atualizar ele', async () => {
    const response = await request(app).post('/users').send({
      name: 'Hawk',
      email: 'test233@example.com',
      password: '123',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result.id).toEqual(2);
    expect(response.body.result.name).toEqual('Hawk');
    expect(response.body.result.email).toEqual('test233@example.com');

    console.log('Response Status Code:', response.statusCode);

    const responseSession = await request(app).post('/session').send({
      email: 'test233@example.com',
      password: '123',
    });

    expect(responseSession.statusCode).toEqual(200);
    console.log('Response Status Code:', responseSession.statusCode);

    const responseUserUpdate = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({
        name: 'Falcão Nasdasda',
        password: '123',
        old_password: '123',
      });

    expect(responseUserUpdate.statusCode).toEqual(200);

    console.log('Response Status Code:', responseUserUpdate.statusCode);
    console.log('Response body:', responseUserUpdate.body);
  });
  it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e apagar a postagem', async () => {
    // falta
    const response = await request(app).post('/users').send({
      name: 'Hawk',
      email: 'test235@example.com',
      password: '123',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result.id).toEqual(3);
    expect(response.body.result.name).toEqual('Hawk');
    expect(response.body.result.email).toEqual('test235@example.com');

    console.log('Response Status Code:', response.statusCode);

    const responseSession = await request(app).post('/session').send({
      email: 'test235@example.com',
      password: '123',
    });

    expect(responseSession.statusCode).toEqual(200);
    console.log('Response Status Code:', responseSession.statusCode);

    const responsePostCreate = await request(app)
      .post('/post')
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({
        title: 'testando',
        content: 'blablablablablablablablablablablablablablablablabl',
      });

    expect(responsePostCreate.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostCreate.statusCode);

    const responsePostDelete = await request(app)
      .delete(`/post/${responsePostCreate.body.result.id}`)
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({});

    expect(responsePostDelete.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostDelete.statusCode);
  });
  it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e buscar por id a postagem', async () => {
    const response = await request(app).post('/users').send({
      name: 'Hawk',
      email: 'test234@example.com',
      password: '123',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result.id).toEqual(4);
    expect(response.body.result.name).toEqual('Hawk');
    expect(response.body.result.email).toEqual('test234@example.com');

    console.log('Response Status Code:', response.statusCode);

    const responseSession = await request(app).post('/session').send({
      email: 'test234@example.com',
      password: '123',
    });

    expect(responseSession.statusCode).toEqual(200);
    console.log('Response Status Code:', responseSession.statusCode);

    const responsePostCreate = await request(app)
      .post('/post')
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({
        title: 'testando',
        content: 'blablablablablablablablablablablablablablablablabl',
      });

    expect(responsePostCreate.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostCreate.statusCode);

    const responsePostUpdate = await request(app)
      .get(`/post/${responsePostCreate.body.result.id}`)
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({});

    expect(responsePostUpdate.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostUpdate.statusCode);
  });
  it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e atualizar a postagem', async () => {
    // falta
    const response = await request(app).post('/users').send({
      name: 'Hawk',
      email: 'test2345@example.com',
      password: '123',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result.id).toEqual(5);
    expect(response.body.result.name).toEqual('Hawk');
    expect(response.body.result.email).toEqual('test2345@example.com');

    console.log('Response Status Code:', response.statusCode);

    const responseSession = await request(app).post('/session').send({
      email: 'test2345@example.com',
      password: '123',
    });

    expect(responseSession.statusCode).toEqual(200);
    console.log('Response Status Code:', responseSession.statusCode);

    const responsePostCreate = await request(app)
      .post('/post')
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({
        title: 'testando',
        content: 'blablablablablablablablablablablablablablablablabl',
      });

    expect(responsePostCreate.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostCreate.statusCode);

    const responsePostUpdate = await request(app)
      .put(`/post/${responsePostCreate.body.result.id}`)
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({ title: 'Novo titulo', content: 'tsctsc' });

    expect(responsePostUpdate.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostUpdate.statusCode);
  });

  it('Deve ser capaz de criar um novo usuário e criar uma nova postagem e buscar por um termo a postagem', async () => {
    const response = await request(app).post('/users').send({
      name: 'Hawk',
      email: 'test236@example.com',
      password: '123',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.result.id).toEqual(6);
    expect(response.body.result.name).toEqual('Hawk');
    expect(response.body.result.email).toEqual('test236@example.com');

    console.log('Response Status Code:', response.statusCode);

    const responseSession = await request(app).post('/session').send({
      email: 'test236@example.com',
      password: '123',
    });

    expect(responseSession.statusCode).toEqual(200);
    console.log('Response Status Code:', responseSession.statusCode);

    const responsePostCreate = await request(app)
      .post('/post')
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({
        title: 'testando1',
        content: 'blablablablablablablablablablablablablablablablabl',
      });

    expect(responsePostCreate.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostCreate.statusCode);
    console.log('Response Body:', responsePostCreate.body);

    const responsePostUpdate = await request(app)
      .get(`/post?search=${responsePostCreate.body.result.title}`)
      .set('Authorization', `Bearer ${responseSession.body.result.token}`)
      .send({});

    expect(responsePostUpdate.statusCode).toEqual(200);
    console.log('Response Status Code:', responsePostUpdate.statusCode);
  }, 10000);
});
