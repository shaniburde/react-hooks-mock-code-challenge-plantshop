import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
  const { id, name, image, price } = plant
  const [inStock, setInStock] = useState(true)

  function updatePrice(){
    fetch('http://localhost:6001/plants/'+id, { 
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({price: +price + 1.00})
    })
    .then((r) => r.json())
    .then((updatedPlant) => onUpdatePlant(updatedPlant))
  }

  function handleClick(){
    setInStock(!inStock)
  }

  function handleDelete(){
    fetch(`http://localhost:6001/plants/${id}`, { 
      method: 'DELETE',
    })
    .then((r) => r.json())
    .then(() => onDeletePlant(plant))
  }

  return (
    <li className="card">
      <button onClick={handleDelete}>X</button>
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <div>
         <p>Price: ${price} <button onClick={() => updatePrice()}>+</button></p>
      </div>
      {inStock ? (
        <button onClick={handleClick} className="primary">In Stock</button>
      ) : (
        <button>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
