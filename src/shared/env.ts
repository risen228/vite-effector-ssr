import { z } from 'zod'

const EnvSchema = z
  .object({
    PUBLIC_EXAMPLE: z.string().transform(Number),
  })
  .transform((raw) => ({
    example: raw.PUBLIC_EXAMPLE,
  }))

const source = typeof window === 'undefined' ? process.env : window.ENV

export const env = EnvSchema.parse(source)
