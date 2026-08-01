import {
    boolean,
    index,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from 'drizzle-orm/pg-core';

export const feeds = pgTable(
    'feeds',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        url: text('url').notNull(),
        siteUrl: text('site_url'),
        title: text('title'),
        isEnabled: boolean('is_enabled').notNull().default(true),
        lastCheckedAt: timestamp('last_checked_at', { mode: 'date' }),
        lastSucessAt: timestamp('last_success_at', { mode: 'date' }),
        lastError: text('last_error'),
        createdAt: timestamp('created_at', { mode: 'date' })
            .notNull()
            .defaultNow(),
        modified_at: timestamp('modified_at', { mode: 'date' })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        uniqueIndex('feeds_url_unique').on(table.url),
        index('feeds_due_check_idx').on(table.url, table.lastCheckedAt),
    ],
);
