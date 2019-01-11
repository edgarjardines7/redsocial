const ctrl = {};
const {Image} = require('../models');

ctrl.index = async (req, res) => {
  const images = await Image.find().sort({timestampo:1}); //-1 para ordenar de manera descendente 
   res.render('index',{images});
};

module.exports = ctrl;