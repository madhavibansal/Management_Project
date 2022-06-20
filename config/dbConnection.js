const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
exports.connectDB = async () => {
    mongoose.connect("process.env.DB_CONNECT", {
            useUnifiedTopology: true,
        })
        .then((data) => console.log(`Connected Successfully ${data.connection.host}`))
        .catch((err) => console.error('Not Connected', err.message));
}