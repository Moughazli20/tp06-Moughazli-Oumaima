exports.get = (req, res) => {
  const catalogue = [
    { ref: "C001", titre: "Chemise en lin", prix: 30 },
    { ref: "C002", titre: "Jeans déchirés", prix: 40 },
    { ref: "C003", titre: "Robe d'été", prix: 25 },
    { ref: "C004", titre: "Sweat à capuche", prix: 35 },
    { ref: "C005", titre: "Chaussures de sport", prix: 50 },
    { ref: "C006", titre: "Blazer élégant", prix: 55 },
    { ref: "C007", titre: "T-shirt graphique", prix: 20 },
    { ref: "C008", titre: "Short en jean", prix: 22 },
    { ref: "C009", titre: "Chapeau de soleil", prix: 15 },
    { ref: "C010", titre: "Montre classique", prix: 60 },
    { ref: "C011", titre: "Écharpe en laine", prix: 18 },
    { ref: "C012", titre: "Sac à dos moderne", prix: 45 },
    { ref: "C013", titre: "Pantalon de jogging", prix: 28 },
    { ref: "C014", titre: "Veste en cuir", prix: 70 },
    { ref: "C015", titre: "Pyjama confortable", prix: 30 },
    { ref: "C016", titre: "Casquette tendance", prix: 12 },
    { ref: "C017", titre: "Maillot de bain", prix: 25 },
    { ref: "C018", titre: "Chaussettes colorées", prix: 8 },
    { ref: "C019", titre: "Gants en cuir", prix: 15 },
    { ref: "C020", titre: "Ceinture ajustable", prix: 18 },
  ];

  res.setHeader("Content-Type", "application/json");

  res.send(catalogue);
};

exports.optionsCatalogue = (req, res) => {
  res.setHeader("Access-Control-Max-Age", 600);
  // Ajouter d'autres en-têtes si nécessaire
  res.send();
};

// hello.js
exports.hello = (req, res) => {
  let responseObj = { nom: req.params.name };
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(responseObj));
};

exports.getSearchCatalogue = (req, res) => {
  console.log("Requête reçue avec le paramètre : ", req.query.filtre);
  const filtre = req.query.filtre;
  const catalogue = [
    { ref: "C001", titre: "Chemise en lin", prix: 30 },
    { ref: "C002", titre: "Jeans déchirés", prix: 40 },
    { ref: "C003", titre: "Robe d'été", prix: 25 },
    { ref: "C004", titre: "Sweat à capuche", prix: 35 },
    { ref: "C005", titre: "Chaussures de sport", prix: 50 },
    { ref: "C006", titre: "Blazer élégant", prix: 55 },
    { ref: "C007", titre: "T-shirt graphique", prix: 20 },
    { ref: "C008", titre: "Short en jean", prix: 22 },
    { ref: "C009", titre: "Chapeau de soleil", prix: 15 },
    { ref: "C010", titre: "Montre classique", prix: 60 },
    { ref: "C011", titre: "Écharpe en laine", prix: 18 },
    { ref: "C012", titre: "Sac à dos moderne", prix: 45 },
    { ref: "C013", titre: "Pantalon de jogging", prix: 28 },
    { ref: "C014", titre: "Veste en cuir", prix: 70 },
    { ref: "C015", titre: "Pyjama confortable", prix: 30 },
    { ref: "C016", titre: "Casquette tendance", prix: 12 },
    { ref: "C017", titre: "Maillot de bain", prix: 25 },
    { ref: "C018", titre: "Chaussettes colorées", prix: 8 },
    { ref: "C019", titre: "Gants en cuir", prix: 15 },
    { ref: "C020", titre: "Ceinture ajustable", prix: 18 },
  ];

  let data = filtre
    ? catalogue.filter((obj) =>
        obj.titre.toLowerCase().includes(filtre.toLowerCase())
      )
    : catalogue;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(data));
};
