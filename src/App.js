import { useEffect, useState } from "react";
import { Car } from "./Car";
import { NewCar } from "./NewCar";

const URI_COLLECTION = 'http://145.24.222.145:8000/cars'

export function App() {
  const [cars, setCars] = useState([])

  const loadJson = () => {
    fetch(URI_COLLECTION, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((result) => setCars(result.items))
      .catch(error => console.log("ERROR: " + error))
  }

  const showCars = cars.map((value, key) =>
    <Car key={value.id} car={value} carsRefreshHandler={loadJson}/>)

  useEffect(loadJson, [])

  return <div>
    <h1>Cars</h1>
    {showCars}
    <div className="addCar">
    <NewCar carsRefreshHandler={loadJson}/>
    </div>
  </div>
}