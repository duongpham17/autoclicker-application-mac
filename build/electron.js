const development = require('./electron-development');
const production = require('./electron-production');

const isProduction = process.env.NODE_ENV === "production";

if(isProduction){
    production.start();
} else {
    development.start();
}