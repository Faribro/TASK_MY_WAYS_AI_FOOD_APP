import React, { useState } from "react";
import "./index.css";

function FoodList() {
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
        </div>
      </div>
      {filteredFoodData.length > 0 ? (
        <ul>
          {filteredFoodData.map((food) => (
            <li key={food.id} className="food-card">
              <img src={food.image} alt={food.foodName} />
              <h3>{food.foodName}</h3>
              <p>Food Type: {food.foodType}</p>
              <p>Max Delivery Time: {food.maxDeliveryTime} minutes</p>
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
