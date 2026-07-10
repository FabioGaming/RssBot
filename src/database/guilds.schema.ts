import { bigint, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const guilds = pgTable('guilds', {
    id: uuid('id').primaryKey().defaultRandom(),
    guildId: text('guild_id').notNull(),
    createdAt: timestamp('added_at', {
        mode: 'date',
        withTimezone: false,
    }).defaultNow(),
});
