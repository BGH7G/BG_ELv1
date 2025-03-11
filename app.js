require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./router/index.js')

const app = express();
const port = process.env.DEV_PORT;

// 数据解析
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 跨域
app.use(cors());
// 日志
app.use(morgan('dev'));
// API请求
app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
