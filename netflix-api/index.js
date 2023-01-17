const express = require('express');
const cors = require('cors');
require('./src/models')
const app = express();

app.use(cors());
app.use(express.json());

app.use(require('./src/routes'));
const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`server runnig port ${PORT}`);
})