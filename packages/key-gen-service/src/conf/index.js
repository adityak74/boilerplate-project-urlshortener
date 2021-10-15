import convict from 'convict';
import net from 'net';

const parseAddresses = input => {
    const addressesStrArray = input.split(',');
    addressesStrArray.forEach(address => {
        if (net.isIP(address) !== 4) {
            throw new Error('must be a IP v4 address');
        }
    });
    return addressesStrArray;
};

const getConfig = () => {
    convict.addFormat({
        name: 'addresses',
        validate: (val) => {
            if (typeof val !== 'string' || !val || val === '') {
                throw new Error('must be a string of addresses');
            }
        },
        coerce: (val) => {
            if (val)
            return parseAddresses(val);
        },
    })
    const conf = convict({
        db: {
            clusters: {
                format: 'addresses',
                default: [],
                env: 'CONTACT_POINTS'
            },
            dataCenter: {
                default: '',
                env: 'LOCAL_DATA_CENTER'
            },
            port: {
                default: 9042,
                env: 'DATABASE_PORT'
            },
            keyspace: {
                default: '',
                env: 'DATABASE_KEYSPACE'
            },
            replicationFactor: {
                default: 1,
                env: 'DATABASE_REPLICATION'
            }
        }
    });
    return conf;
};

export default getConfig;
