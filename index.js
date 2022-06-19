const route = require("./routes/index")
const express = require("express");
const {connectDB} = require("./config/dbConnection");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));
app.use(express.json())
route(app);
const port=9000


//db connection
connectDB();

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
})