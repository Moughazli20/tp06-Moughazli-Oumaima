const { v4: uuidv4 } = require ("uuid");
const bcrypt = require('bcrypt');
const { ACCESS_TOKEN_SECRET }  = require ("../config.js");
const Utilisateur = require('../DB/Models/utilisateur.model');
const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '365d' });
  }

exports.login = (req, res) => {
  const { login, password } = req.body;

  Utilisateur.findOne({ where: { login } })
      .then(utilisateur => {
          if (!utilisateur) {
              return res.status(401).send({ message: "Utilisateur non trouvé" });
          }

          bcrypt.compare(password, utilisateur.password, function(err, result) {
              if (result) {
                  const userForToken = {
                      id: utilisateur.id,
                      email: utilisateur.email
                  };

                  let accessToken = generateAccessToken(userForToken);
                  res.setHeader('Authorization', `Bearer ${accessToken}`);
                  res.send(utilisateur);
              } else {
                  return res.status(401).send({ message: "Mot de passe incorrect" });
              }
          });
      })
      .catch(err => {
          console.error('Erreur de connexion:', err);
          res.status(500).send({ message: "Erreur lors de la connexion" });
      });
};

exports.inscrire = async (req, res) => {
  try {
      const { nom, prenom, email, login, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const nouveauUtilisateur = await Utilisateur.create({
          nom,
          prenom,
          email,
          login,
          password: hashedPassword
      });

      const userForToken = {
          id: nouveauUtilisateur.id,
          email: nouveauUtilisateur.email
      };

      let accessToken = generateAccessToken(userForToken);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.status(201).send(nouveauUtilisateur);
  } catch (err) {
      console.error('Erreur d’inscription:', err);
      res.status(500).send({ message: "Erreur lors de l'inscription" });
  }
};





