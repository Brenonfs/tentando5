// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

export const postCreateSchema = z.object({
  title: z
    .string({
      required_error: 'O  campo "title" está vazio',
      invalid_type_error: 'O  campo "title" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "title" está muito pequeno' }),

  content: z
    .string({
      required_error: 'O  campo "content" está vazio',
      invalid_type_error: 'O  campo "content" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "content" está muito pequeno' }),
});

export const postUpdatedSchema = z.object({
  title: z
    .string({
      required_error: 'O  campo "title" está vazio',
      invalid_type_error: 'O  campo "title" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "title" está muito pequeno' }),

  content: z
    .string({
      required_error: 'O  campo "content" está vazio',
      invalid_type_error: 'O  campo "content" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "content" está muito pequeno' }),
});

export const postIdSchema = z.string({
  required_error: 'O  campo "id" está vazio',
  invalid_type_error: 'O  campo "id" tem caracteres inválidos',
});

export const postSearchSchema = z.object({
  search: z.string(),
});
