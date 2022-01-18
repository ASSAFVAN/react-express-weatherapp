// const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const PORT = process.env.PORT || 5000;

const app = express();

// Setup static directory to serve

app.use(express.json());

// app.get("/", (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       name: "name of your app",
//       version: "0.1.0",
//     },
//   });
//   next();
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get(
  "/",
  (req,
  (res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  })
);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}.`);
});
