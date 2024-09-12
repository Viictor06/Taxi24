const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/Taxi24';

const dbConnection = async () => {
    try {
        await mongoose.connect(url);
        console.log('Conexion exitosa');
    } catch (error) {
        console.error('Error de conexion:', error.message);
        process.exit(1);
    }
};

module.exports = { dbConnection };