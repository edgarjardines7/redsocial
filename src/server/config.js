const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index')
const errorHandler = require('errorhandler')

module.exports = app => {
  //Settings
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../views'));
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers')
  }));
  app.set('view engine', '.hbs');

  // middelwares
  /* Morgan es básicamente un registrador , 
  en cualquier solicitud que se realice,
   genera registros automáticamente
   
   ejemplo 
   GET / 304 2.984 ms - -
   */
  app.use(morgan('dev'));
  /** Multer permite la subida de archivos a nuestro servidor */
  app.use(multer({
    desr: path.join(__dirname, '../public/upload/temp')
  }).single('image'));

  app.use(express.urlencoded({
    /**Esta opciñon permite elegir entre analizar los datos codificados
     * en URL con la biblioteca de cadenas de consulta (cuando es falso)
     */
    extendend: false
  }));
  app.use(express.json());


  // routes
  routes(app);

  //static files
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // errorhandlers
  if ('development' === app.get('env')) {
    app.use(errorHandler);
  }

  
  return app;
}
