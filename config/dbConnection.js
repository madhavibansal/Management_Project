const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
exports.connectDB = async () => {
    mongoose.connect("mongodb+srv://madhavibansal:madhaviba@cluster0.9ka80.mongodb.net/mobilloite?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
        })
        .then((data) => console.log(`Connected Successfully ${data.connection.host}`))
        .catch((err) => console.error('Not Connected', err.message));
}