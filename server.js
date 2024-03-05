// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Food = require('./food');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://kavya:kavyapujari26@kavya.xndm6y0.mongodb.net/foodDB");

// CRUD Endpoints
app.post('/api/food', async (req, res) => {
  try {
    const foodItem = new Food(req.body);
    const savedFoodItem = await foodItem.save();
    res.json(savedFoodItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/food', async (req, res) => {
  try {
    const allFoodItems = await Food.find();
    res.json(allFoodItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/food/:id', async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.id);
    res.json(foodItem);
  } catch (error) {
    res.status(404).json({ error: 'Food item not found' });
  }
});

app.put('/api/food/:id', async (req, res) => {
  try {
    const updatedFoodItem = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFoodItem);
  } catch (error) {
    res.status(404).json({ error: 'Food item not found' });
  }
});

app.delete('/api/food/:id', async (req, res) => {
  try {
    const deletedFoodItem = await Food.findOne(req.params.foodGroup);
    if (!deletedFoodItem) {
      // If deletedFoodItem is null, the document was not found
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json(deletedFoodItem);
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
