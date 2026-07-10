import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { subscriptions } from '../schemas/subscriptions.schema';
import { feedItems } from '../schemas/feed-items.schema';

export const deliveryLogs = pgTable('delivery_logs', {
    id: uuid('id').primaryKey().defaultRandom(),
    subscriptionId: uuid('subscription_id')
        .notNull()
        .references(() => subscriptions.id, { onDelete: 'cascade' }),
    itemId: uuid('item_id')
        .notNull()
        .references(() => feedItems.id, { onDelete: 'cascade' }),
    discordMessageId: text('discord_message_id'),
    deliveredAt: timestamp('delivered_at', { mode: 'date' })
        .notNull()
        .defaultNow(),
    createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
    error: text('error'),
});
