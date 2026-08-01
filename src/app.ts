import { Client } from 'discord.js';
import { env } from './lib/env';

console.log(`Starting bot in ${env.NODE_ENV} mode`);

const client = new Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

export default client;
