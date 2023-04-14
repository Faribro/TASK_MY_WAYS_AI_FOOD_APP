import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function FoodForm() {
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("Delicious Food");
  const [maxDeliveryTime, setMaxDeliveryTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const foodData = {
      foodName: foodName,
      foodType: foodType,
      maxDeliveryTime: maxDeliveryTime,
    };
    localStorage.setItem("foodData", JSON.stringify(foodData));
    setFoodName("");
    setFoodType("Delicious Food");
    setMaxDeliveryTime("");
  };

  return (
    <div className="food-form">
      <h2>Create a Food</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="food-name">Food Name:</label>
          <input
            type="text"
            id="food-name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="food-type">Food Type:</label>
          <select
            id="food-type"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
          >
            <option value="Delicious Food">Delicious Food</option>
            <option value="Nutritious Food">Nutritious Food</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Beverages">Beverages</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="max-delivery-time">Max Delivery Time (in minutes):</label>
          <input
            type="number"
            id="max-delivery-time"
            value={maxDeliveryTime}
            onChange={(e) => setMaxDeliveryTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Food</button>
      </form>
    </div>
  );
}

function FoodList() {
  const [foodTypeFilter, setFoodTypeFilter] = useState("");
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState("");

  const foodData = JSON.parse(localStorage.getItem("foodData")) || [];
  const filteredFoodData
