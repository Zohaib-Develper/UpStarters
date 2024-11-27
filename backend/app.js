const express = require("express");
const app = express();
const projectHandler = require("./routers/projectRouter");
const userHandler = require("./routers/userRouter");
const investmentHandler = require("./routers/investmentRouter");
const investorHandler = require("./routers/investorRouter");
const paymentHandler = require("./routers/paymentRouter")
const cors = require("cors");

// Configure CORS options
const corsOptions = {
  origin: true, // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use the CORS middleware with the options
app.use(cors(corsOptions));
const errorController = require("./controllers/errorController");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res, next) => {
//     res.status(200).send("Hello SDA")
// })

// app.get('/api/project/all',authControler.Protect, authControler.RestrictTo('admin'), projectControler.All_Active_Projects)
app.use("/api/project", projectHandler);
app.use("/api/auth", userHandler);
app.use("/api", userHandler);
app.use("/api/invest", investmentHandler);
app.use("/api/investor", investorHandler);

app.use(errorController);

module.exports = app;
