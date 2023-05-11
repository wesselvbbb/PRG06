import { useState } from "react";

const URI_COLLECTION = 'http://145.24.222.145:8000/cars'

export function NewCar(props) {
  console.log(props);

  const [car, setCar] = useState({
    brand: "",
    color: "",
    model: "",
    price: "",
    year: ""
  })

  const saveCar = (event) => {
    event.preventDefault()
    fetch(URI_COLLECTION, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(car)
    })
      .then((_response) => props.carsRefreshHandler())
  }

  const onChangeHandler = (event) => {
    setCar({
        ...car,
        [event.target.name]: event.target.value,
      })
  }

  return <section>
    <h2>Add a new car!</h2>
    <form>
        <label>Brand name:</label><br></br>
        <input type="text" value={car.brand} name="brand" onChange={onChangeHandler}/><br></br>
        <label>Color:</label><br></br>
        <input type="text" value={car.color} name="color" onChange={onChangeHandler}/><br></br>
        <label>Model name:</label><br></br>
        <input type="text" value={car.model} name="model" onChange={onChangeHandler}/><br></br>
        <label>Price:</label><br></br>
        <input type="text" value={car.price} name="price" onChange={onChangeHandler}/><br></br>
        <label>Year:</label><br></br>
        <input type="text" value={car.year} name="year" onChange={onChangeHandler}/><br></br>
    <button onClick={saveCar}>SAVE</button>
    </form>
  </section>
}