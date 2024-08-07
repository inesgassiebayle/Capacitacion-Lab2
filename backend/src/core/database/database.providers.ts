import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }

        // Debug logs to check the configuration
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Database Config:', config);

        const sequelize = new Sequelize({
            ...config,
            dialect: config.dialect,
        });

        sequelize.addModels([User]);
        await sequelize.sync();
        return sequelize;
    },
}];
