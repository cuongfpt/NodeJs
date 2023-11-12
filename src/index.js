const express = require("express");
const morgan = require("morgan");
const path = require("path");
const handlebars = require("express-handlebars"); // Sử dụng exphbs thay vì handlebars
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("combined"));

console.log(typeof handlebars);
// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

const routes = require("./resources/routes");

const db = require("./resources/config/db");

db.connect();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
