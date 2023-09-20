import axios, { AxiosInstance } from 'axios';

export class PeopleApi {
  private api: AxiosInstance;

  constructor(secret: string) {
    this.api = axios.create({
      baseURL: process.env.DATABASE_PESSOAS_URL,
      headers: {
        secret,
      },
    });
  }

  async createPerson(body: object) {
    const response = await this.api.post('/people/', body);

    let idPerson;
    if (response.data.result.id) {
      idPerson = response.data.result.id;
    } else if (response.data.result) {
      idPerson = response.data.result;
    }

    return idPerson;
  }
}
