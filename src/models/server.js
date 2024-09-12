const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/dbconfig");

class Server {
    
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.middlewares();
    this.routes();

    this.connectDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  async connectDB() {
    await dbConnection();
  }

  routes() {
    this.app.use('/passengers', require('../routes/passengers.routes'));
    this.app.use('/drivers', require('../routes/drivers.routes'));
    this.app.use('/trips', require('../routes/trips.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running at port ${this.port}`);
    });
  }
}

module.exports = Server;
