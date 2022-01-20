import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((r) => r.json())
      .then(setPlants)
  }, []);

  function handleAddPlant(newPlant){
    // setPlants([...plants, newPlant])
    setPlants((oldPlants) => [...oldPlants, newPlant])
  };

  function handleUpdatePlant(updatedPlant){
    const updatedPlants = plants.map((plant) => {
      if(plant.id === updatedPlant.id){
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlants);
  }

  function handleDeletePlant(plantToDelete){
    const updatedPlants = plants.filter((plant) => {
      if(plant.id !== plantToDelete.id) {
        return plant
      } else {
        return null
      }
    });
    setPlants(updatedPlants);
  }

  const filteredPlants = plants.filter(({name}) => {
    return name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant}/>
      <Search search={search} setSearch={setSearch} />
      <PlantList plants={filteredPlants} onDeletePlant={handleDeletePlant} onUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;
