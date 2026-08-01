import {
    index,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from 'drizzle-orm/pg-core';
import { feeds } from './feeds.schema';

export const feedItems = pgTable(
    'feed_items',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        feedId: uuid('feed_id')
            .notNull()
            .references(() => feeds.id, { onDelete: 'cascade' }),
        guid: text('guid').notNull(),
        title: text('title').notNull(),
        link: text('link').notNull(),
        author: text('author'),
        summary: text('summary'),
        publishedAt: timestamp('published_at', { mode: 'date' }),
        createdAt: timestamp('created_at', { mode: 'date' })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        uniqueIndex('feed_items_feed_guid_unique').on(table.feedId, table.guid),
        index('feed_items_feed_idx').on(table.feedId),
        index('feed_items_published_idx').on(table.publishedAt),
    ],
);
