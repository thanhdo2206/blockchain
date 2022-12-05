const express = require('express')
const rootRouter = require('./routers')
const {sequelize} = require('./models')
const path = require('path');
const cors = require('cors');
const dotenv = require("dotenv");


dotenv.config();



const app = express()

app.use(cors());

//cài ứng dụng sử dụng kiểu json
app.use(express.json());

//static file
const publicPath = path.join(__dirname, 'public');
app.use("/public",express.static(publicPath));

//dùng router
app.use("/api/v1",rootRouter)

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})