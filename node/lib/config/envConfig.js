const dotenv = require('dotenv');
const path = require("path");

module.exports = () => {
    switch(process.env.NODE_ENV) {
        case 'development':
        case 'dev': {
            dotenv.config({path: path.resolve(__dirname, '..', '..', '.env.development')});
            break;
        }

        default:
            dotenv.config({path: path.resolve(__dirname, '..', '..', '.env.development')});
    }
}

