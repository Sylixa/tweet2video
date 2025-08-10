import 'dotenv/config';
import { z } from 'zod';

const zodConfiguration = z.object({
    environment: z.enum(['development', 'test', 'production']),
    port: z.number(),
});

console.log('App Mode: ', process.env.NODE_ENV);
export const configuration = zodConfiguration.parse({
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT) : 4242,
});
