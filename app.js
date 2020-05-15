const express = require('express')
    , mongoose = require('mongoose')
    , router = require('./routes')

const _CONFIG = require("./misc/config");

const app = express();

mongoose.connect('mongodb+srv://secureParkingSystem:' + process.env.MONGO_ATLAS_PW +'@sps-arks6.mongodb.net/Ecommerce?retryWrites=true&w=majority', 
                { useNewUrlParser: true, useUnifiedTopology: true }, 
                () => console.log("connected to database!"));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/', router.home);
app.use('/user', router.user);
app.use('/product', router.product);
app.use('/order', router.order);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`E-commerce Server started on port *:${PORT}`);
});