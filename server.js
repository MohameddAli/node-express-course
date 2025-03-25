const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authentication middleware
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication invalid' });
  }
  
  const token = authHeader.split(' ')[1];
  
  // For demo purposes, we'll use a simple token check
  // In a real application, you would verify the token with JWT or another method
  if (token === 'secret-token') {
    next();
  } else {
    return res.status(401).json({ success: false, message: 'Authentication invalid' });
  }
};

// Apply the authentication middleware to all API routes
app.use('/api', authenticateUser);

// Sample data - a list of people
const people = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Bob Johnson', age: 35 }
];

// Routes

// GET: Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js and Express tutorial!' });
});

// GET: Get all people
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// GET: Get a specific person by ID
app.get('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const person = people.find(person => person.id === Number(id));
  
  if (!person) {
    return res.status(404).json({ success: false, message: `No person with id ${id}` });
  }
  
  res.status(200).json({ success: true, data: person });
});

// POST: Create a new person
app.post('/api/people', (req, res) => {
  const { name, age } = req.body;
  
  if (!name || !age) {
    return res.status(400).json({ success: false, message: 'Please provide name and age values' });
  }
  
  const newPerson = {
    id: people.length + 1,
    name,
    age: Number(age)
  };
  
  people.push(newPerson);
  res.status(201).json({ success: true, data: newPerson });
});

// PUT: Update a person
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  
  const person = people.find(person => person.id === Number(id));
  
  if (!person) {
    return res.status(404).json({ success: false, message: `No person with id ${id}` });
  }
  
  if (name) person.name = name;
  if (age) person.age = Number(age);
  
  res.status(200).json({ success: true, data: person });
});

// DELETE: Delete a person
app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const personIndex = people.findIndex(person => person.id === Number(id));
  
  if (personIndex === -1) {
    return res.status(404).json({ success: false, message: `No person with id ${id}` });
  }
  
  const deletedPerson = people.splice(personIndex, 1)[0];
  res.status(200).json({ success: true, data: deletedPerson });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});