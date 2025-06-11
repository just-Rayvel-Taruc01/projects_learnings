const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;

// Imported database connection
const { db, connectToDatabase } = require('./database'); // Adjust the path based on your project structure
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'node_modules' directory
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set static files directory
app.use(express.static('public'));

// Connect to the database
connectToDatabase(); 

const saltRounds = 10; // Number of salt rounds for bcrypt

// Routes for login and register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are present and password is not empty
  if (!username || !email || !password) {
    return res.status(400).send('Username, email, and password are required');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user data into the database
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

    res.send('Registration successful');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body; 
 
  try {
    // Query the database for the user with the provided email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    // Check if the user exists
    if (rows.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = rows[0];

    // Compare the provided password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define routes
// Home route - Fetch pets
app.get('/', async (req, res) => {
  try {
    const [pets] = await db.query(
      'SELECT pet_id, name, species, age, gender, description, image_path FROM pets WHERE adopted = FALSE'
    );
    res.render('index', { pets });
  } catch (err) {
    console.error('Error fetching pets:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/about_Us', (req, res) => {
  res.render('about_Us');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contactus', (req, res) => {
  res.render('contactus');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

