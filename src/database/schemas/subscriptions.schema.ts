import {
    boolean,
    index,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from 'drizzle-orm/pg-core';
import { guilds } from './guilds.schema';
import { feeds } from './feeds.schema';

export const subscriptions = pgTable(
    'subscriptions',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        guildId: text('guild_id')
            .notNull()
            .references(() => guilds.id, { onDelete: 'cascade' }),
        feedId: uuid('feed_id')
            .notNull()
            .references(() => feeds.id, { onDelete: 'cascade' }),
        channelId: text('channel_id').notNull(),
        roleId: text('role_id'),
        isEnabled: boolean('is_enabled').notNull().default(true),
        createdAt: timestamp('created_at', { mode: 'date' })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        uniqueIndex('subscriptions_unique_target').on(
            table.guildId,
            table.feedId,
            table.channelId,
        ),
        index('subscriptions_feed_idx').on(table.feedId),
        index('subscription_guild_idx').on(table.guildId),
    ],
);
