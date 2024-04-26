const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Simulated database
let users = [];

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Create a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get a specific user
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === userId);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

// Update a specific user
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updateUser = req.body;
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) {
    res.status(404).send('User not found');
  } else {
    users[index] = { ...users[index], ...updateUser };
    res.json(users[index]);
  }
});

// Delete a specific user
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) {
    res.status(404).send('User not found');
  } else {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
