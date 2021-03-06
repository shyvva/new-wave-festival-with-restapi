const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// import database
const db = require('./db.js');

// import routes
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', testimonialsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });