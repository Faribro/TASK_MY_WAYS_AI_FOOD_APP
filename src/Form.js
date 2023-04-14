import { useState } from "react";
import "./index.css";

function FoodForm() {
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [maxDeliveryTime, setMaxDeliveryTime] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new food object
    const newFood = {
      foodName,
      foodType,
      maxDeliveryTime: parseInt(maxDeliveryTime),
      photoUrl: photo ? URL.createObjectURL(photo) : null,
    };

    // Get existing food data from local storage
    const existingFoodData = JSON.parse(localStorage.getItem("foodData")) || [];

    // Add new food to existing data
    const updatedFoodData = [...existingFoodData, newFood];

    // Save updated data to local storage
    localStorage.setItem("foodData", JSON.stringify(updatedFoodData));

    // Reset form fields
    setFoodName("");
    setFoodType("");
    setMaxDeliveryTime("");
    setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="foodName">Food Name:</label>
      <input
        type="text"
        id="foodName"
        value={foodName}
        name="foodName"
        onChange={(e) => setFoodName(e.target.value)}
        required
      />
      <br />

      <label htmlFor="foodType">Food Type:</label>
      <select
        id="foodType"
        value={foodType}
        onChange={(e) => setFoodType(e.target.value)}
        required
      >
        <option value="">Select food type</option>
        <option value="Delicious Food">Delicious Food</option>
        <option value="Nutritious Food">Nutritious Food</option>
        <option value="Fast Food">Fast Food</option>
        <option value="Beverages">Beverages</option>
        <option value="Desserts">Desserts</option>
      </select>

      <br />

      <label htmlFor="maxDeliveryTime">Max Delivery Time (minutes):</label>
      <input
        type="number"
        id="maxDeliveryTime"
        value={maxDeliveryTime}
        onChange={(e) => setMaxDeliveryTime(e.target.value)}
        required
      />
      <br />

      <label htmlFor="photo">Photo:</label>
      <input
        type="file"
        id="photo"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <br />

      <button type="submit">Post Food</button>
    </form>
  );
}

export default FoodForm;
