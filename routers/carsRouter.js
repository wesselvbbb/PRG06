const express = require("express");
const router = express.Router();
const Car = require("../models/carsModel");

//middleware
router.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","Origin, X-Requested-With, Content-Type, Accept");
  if (req.headers.accept == "application/json" || req.method == 'OPTIONS') {
    next();
  } else {
    res
      .status(400).send();
  }
});

// Check content-type
router.post("/", (req, res, next) => {
  if (req.header("Content-Type") === "application/json" || "application/x-www-form-urlencoded") {
    next();
  } else {
    res.status(400).send();
  }
});

// check empty values
router.post("/", (req, res, next) => {
  if (req.body.brand && req.body.model && req.body.year && req.body.color && req.body.price) {
    next();
  } else {
    res.status(400).send();
  }
});

// POST
router.post('/', async (req, res) => {
  console.log("POST");
  let car = Car({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    price: req.body.price
  });

  try {
    await car.save();
    res.status(201).json(car);
  } catch {
    res.status(500).send();
  }
});

router.get("/", async (req, res) => {
  console.log("GET request for collection");
  try {
    let cars = await Car.find();

    let carsCollection = {
      items: cars,
      _links: {
        self: {
          href: `${process.env.BASE_URI}cars/`
        },
        collection: {
          href: `${process.env.BASE_URI}cars/`
        }
      },
      pagination: "wip"
    }

    res.json(carsCollection);
  } catch {
    res.status(500).send();
  }
});

//OPTIONS
router.options("/", (req, res) => {
  res.setHeader("Allow", "GET,POST,OPTIONS");
  res.send();
});

//Detail
//GET
router.get("/:carId", async (req, res) => {
  console.log(req.params.carId);
  try {
    const cars = await Car.findById(req.params.carId);
    let carJson = cars.toJSON();

    carJson._links = {
      self: {
        href: `${process.env.BASE_URI}cars/${carJson._id}`,
      },
      collection: {
        href: `${process.env.BASE_URI}cars/`,
      },
    };

    res.send(carJson);
  } catch (err) {
    res.status(404).send("This id doesn't exist.");
  }
});

//DELETE
router.delete("/:carId", async (req, res) => {
  try {
    await Car.deleteOne({ _id: req.params.carId });
    res.status(204).send("Car deleted!");
  } catch (err) {
    res.status(404).send("Car does not exist");
  }
});

//PUT
router.put("/:carId", async (req, res) => {
  const car = await Car.findById(req.params.carId);

  if (
    req.body.brand === "",
    req.body.model === "",
    req.body.year === "",
    req.body.color === "",
    req.body.price === ""
  ) {
    res.status(412).send("Fields can't be empty");
  } else {
    car.brand = req.body.brand;
    car.model = req.body.model;
    car.year = req.body.year;
    car.color = req.body.color;
    car.price = req.body.price;
    car.save(() => {
      res.status(200).send(`Changed car: ${car.brand}`);
    });
  }
});

router.options("/:carId", (req, res) => {
  res.header("Allow", "GET,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS").send();
});

module.exports = router;
