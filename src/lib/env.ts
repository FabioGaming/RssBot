// src/env.ts
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),

    DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
    DISCORD_CLIENT_ID: z.string().min(1, 'DISCORD_CLIENT_ID is required'),

    DATABASE_URL: z.url('DATABASE_URL must be a valid database URL'),

    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

    RSS_POLL_INTERVAL_MINUTES: z.coerce.number().int().positive().default(60),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:');

    for (const issue of parsedEnv.error.issues) {
        console.error(`- ${issue.path.join('.')}: ${issue.message}`);
    }

    process.exit(1);
}

export const env = parsedEnv.data;

export type Env = z.infer<typeof envSchema>;
