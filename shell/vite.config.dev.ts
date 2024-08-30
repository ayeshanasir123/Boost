import config from './vite.config';
import deepmerge from 'deepmerge';
import path from 'path';

export default deepmerge(config, {
    resolve: {
        alias: {
            '@boost/repository': path.resolve(__dirname, '../packages/repository/src'),
        }
    },
});