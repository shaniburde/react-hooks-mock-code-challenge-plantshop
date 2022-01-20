import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, onUpdatePlant }) {
  
  const plantCard = plants.map((plant) => (
  <PlantCard 
    key={plant.id} 
    plant={plant} 
    onDeletePlant={onDeletePlant} 
    onUpdatePlant={onUpdatePlant} 
  />
  ));

  return (
    <ul className="cards">{plantCard}</ul>
  );
}

export default PlantList;
