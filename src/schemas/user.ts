// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

export const userCreateSchema = z.object({
  name: z
    .string({
      required_error: 'O  campo "name" está vazio',
      invalid_type_error: 'O  campo "name" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "name" está muito pequeno' }),
  email: z
    .string({
      required_error: 'O  campo "email" está vazio',
      invalid_type_error: 'O  campo "email" tem caracteres inválidos',
    })
    .email()
    .min(10, { message: 'O campo "email" está muito pequeno' }),
  password: z
    .string({
      required_error: 'O  campo "password" está vazio',
      invalid_type_error: 'O  campo "password" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "password" está muito pequeno' }),
  cpf: z
    .string({
      required_error: 'O  campo "cpf" está vazio',
      invalid_type_error: 'O  campo "cpf" tem caracteres inválidos',
    })
    .min(11, { message: 'O campo "email" está muito pequeno' }),
  dataNascimento: z.string({
    required_error: 'O  campo "data Nascimento" está vazio',
    invalid_type_error: 'O  campo "data Nascimento" tem caracteres inválidos',
  }),
});

export const userUpdateSchema = z.object({
  name: z
    .string({
      required_error: 'O  campo "name" está vazio',
      invalid_type_error: 'O  campo "name" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "name" está muito pequeno' }),
  email: z
    .string({
      required_error: 'O  campo "email" está vazio',
      invalid_type_error: 'O  campo "email" tem caracteres inválidos',
    })
    .email()
    .min(10, { message: 'O campo "email" está muito pequeno' }),
  password: z
    .string({
      required_error: 'O  campo "password" está vazio',
      invalid_type_error: 'O  campo "password" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "password" está muito pequeno' }),
  old_password: z
    .string({
      required_error: 'O  campo "old password" está vazio',
      invalid_type_error: 'O  campo "old password" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "old password" está muito pequeno' }),
  idPerson: z.number({
    required_error: 'O  campo "idPerson" está vazio',
    invalid_type_error: 'O  campo "idPerson" tem caracteres inválidos',
  }),
});
