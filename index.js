const express = require("express");
const cors = require("cors");
const config = require("./config");
const blogRoutes = require("./routes/blog_routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended : true}));

app.use("/api", blogRoutes.routes);

app.listen(config.port, () => {
    console.log("Server running on port", config.port);
})
