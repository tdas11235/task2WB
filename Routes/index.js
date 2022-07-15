const express = require("express");
const router= express.Router();
const cors = require("cors");
const app= express();

app.use(cors());
app.use(router);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.use("/auth", require("./auth"));

module.exports= router;