const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/newsapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connection Successful');
}).catch((e) => {
    console.log(e);
})