const express = require('express');
const app = express();
const projectHandler = require('./routers/projectRouter')
const userHandler = require('./routers/userRouter')
const investmentHandler = require('./routers/investmentRouter')
const investorHandler = require('./routers/investorRouter')

const errorController = require('./controllers/errorController')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res,next) => {
    res.status(200).send("Hello SDA")
})


app.use('/api/project', projectHandler);
app.use('/api/auth', userHandler)
app.use('/api/me', userHandler)
app.use('/api/invest', investmentHandler)
app.use('/api/investor', investorHandler)

app.use(errorController)

module.exports = app;