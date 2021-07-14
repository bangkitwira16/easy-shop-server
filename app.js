const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const api = process.env.API_URL;
const productRouter = require('./routers/products')
const userRouter = require('./routers/users')
const categoriesRouter = require('./routers/categories')
const orderRouter = require('./routers/orders')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')


//Cors
app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt())
app.use(errorHandler)

//Router
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop_database',
    pass: 'Ka392005'
}).then(() => {
    console.log('Database connected...')
}).catch((err) => {
    console.log(err)
})

// development
// app.listen(3000, () => {
//     console.log(api)
//     console.log('server is running  http://localhost:3000')
// })

// production
var server= app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("Express is working on port " + port)
})