const sequelize = require('./DB/db'); 
const express = require("express");
const cors = require("cors");

const app  = express ();

var corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Content-Type, Authorization',
  exposedHeaders:'Authorization'
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/images', express.static('imgAng'));

app.use(express.urlencoded({ extended: true }));
require("./routes")(app);

const PORT =  443;

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });
