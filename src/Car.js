import { useEffect, useState } from "react";


export function Car(props) {

  console.log(props);
  const [car, setCar] = useState(props.car)

  const deleteCar = () => {
    fetch(car._links.self.href, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((response) => props.carsRefreshHandler())
  }

  return <section>
    <div className="cars">
    <h2>{car.brand}</h2>
    <p>{car.model}</p>
    <button className="delete-btn" onClick={deleteCar}>DELETE</button>
    </div>
  </section>
}