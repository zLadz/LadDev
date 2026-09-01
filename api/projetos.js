const projetos = require('../data/projetos');

module.exports = (req, res) => {
  res.status(200).json(projetos);
};