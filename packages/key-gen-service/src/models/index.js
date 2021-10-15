import expressCasandra from 'express-cassandra';

import UnusedKeys from './UnusedKeys';
import UsedKeys from './UsedKeys';

const databaseModels = [
    UnusedKeys,
    UsedKeys,
];

const createModels = (config) => {
    const models = expressCasandra.createClient({
        clientOptions: {
            contactPoints: config.get('db.clusters'),
            localDataCenter: config.get('db.dataCenter'),
            protocolOptions: {
                port: config.get('db.port'),
            },
            keyspace: config.get('db.keyspace'),
            queryOptions: {
                consistency: expressCasandra.consistencies.one,
            }
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe'
        },
    });
    databaseModels.forEach(model => {
        const loadedModel  = models.loadSchema(model.modelName, model.modelSchema)
        loadedModel.syncDB((error, results) => results
            ? console.log(`${model.modelName} schema is updated`)
            : null
        );
    });
    return models;
};

export default createModels;
