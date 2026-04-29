import { tasks } from '@commandkit/tasks';
import { defineConfig } from 'commandkit/config';

export default defineConfig({
    plugins: [tasks()],
});
