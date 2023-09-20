import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import request from 'supertest';

import { app } from './app';

let mockAxios: MockAdapter;

describe('UserControllers', () => {
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  it('deve criar um usuário com sucesso', async () => {
    // Configura o MockAdapter para interceptar a solicitação correta
    const test = mockAxios.onPost('http://localhost:5001/people/').reply(200, {
      result: {
        id: 1,
      },
    });
    console.log(test);
    const userPayload = {
      name: 'Hawk',
      email: 'test1@example.com',
      password: '123',
    };
    // Faz a solicitação real para criar um usuário
    const responseCreate = await request(app).post('/users').send(userPayload);
    // Verifica se a resposta da sua aplicação tem o código 200 (sucesso)
    expect(responseCreate.statusCode).toEqual(200);
    console.log(responseCreate.body);
    // Verifica se o corpo da resposta inclui os dados esperados (opcional)
    expect(responseCreate.body).toEqual({
      error: false,
      message: 'Sucess: user created',
      result: responseCreate.body.result,
    });
  });
});
