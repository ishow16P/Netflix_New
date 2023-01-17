const mongoose = require('mongoose');
const envService = JSON.parse(process.env.service);
const { conn_type, ip, port, path } = envService.mongodb.local;
let url_mongoDB = `${conn_type}://${ip}:${port}${path}`;

mongoose.Promise = global.Promise;

mongoose.connect(url_mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    err ? console.log(`DB connec error ${err}`) : console.log(`Mongo connection success ${url_mongoDB}`);
}
)