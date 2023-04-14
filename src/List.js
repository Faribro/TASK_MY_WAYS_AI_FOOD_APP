import React, { useState } from "react";
import "./index.css";

function FoodList({ food }) {
  const [foodNameFilter, setFoodNameFilter] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("");
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState("");

  const foodData = JSON.parse(localStorage.getItem("foodData")) || [];
  const filteredFoodData = foodData.filter((food) => {
    const foodNameMatch = foodNameFilter
      ? food.foodName === foodNameFilter
      : true;
    const foodTypeMatch = foodTypeFilter
      ? food.foodType === foodTypeFilter
      : true;
    const deliveryTimeMatch = deliveryTimeFilter
      ? food.maxDeliveryTime <= deliveryTimeFilter
      : true;
    return foodNameMatch && foodTypeMatch && deliveryTimeMatch;
  });

  function handleDeleteAll(id) {
    const updatedFoodData = foodData.filter((food) => food.id !== id);
    localStorage.setItem("foodData", JSON.stringify(updatedFoodData));
    window.location.reload(); // Refresh the page to reflect the changes
  }

  let handleDelete = (id) => {
    const foodIndex = foodData.findIndex((food) => food.id === id);
    if (foodIndex !== -1) {
      const updatedFoodData = [...foodData];
      updatedFoodData.splice(foodIndex, 1);
      localStorage.setItem("foodData", JSON.stringify(updatedFoodData));
      window.location.reload(); // Refresh the page to reflect the changes
    }
  };

  return (
    <div className="food-list">
      <h2>All Foods : </h2>
      <div className="filter-form">
        <div className="form-group">
          <label htmlFor="food-type-filter">Food Type:</label>
          <select
            id="food-type-filter"
            value={foodTypeFilter}
            onChange={(e) => setFoodTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Delicious Food">Delicious Food</option>
            <option value="Nutritious Food">Nutritious Food</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Beverages">Beverages</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="delivery-time-filter">
            Max Delivery Time (in minutes):
          </label>
          <input
            id="delivery-time-filter"
            type="number"
            value={deliveryTimeFilter}
            onChange={(e) => setDeliveryTimeFilter(e.target.value)}
          />
          {/* <button onClick={() => handleDeleteAll(food.id)}>Delete All</button> */}
        </div>
      </div>
      {filteredFoodData.length > 0 ? (
        <ul>
          {filteredFoodData.map((food) => (
            <li key={food.id} className="food-card">
              <img src={food.image} alt={food.foodName} /> <br />
              <h3>{food.foodName}</h3> <br />
              <p>Food Type: {food.foodType}</p> <br />
              <p>Max Delivery Time: {food.maxDeliveryTime} minutes</p>
              <button onClick={() => handleDelete(food.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No foods found.</p>
      )}
    </div>
  );
}

export default FoodList;
