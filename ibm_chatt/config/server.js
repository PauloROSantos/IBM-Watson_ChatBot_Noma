/* importar o modulo do framework express */

var express = require('express');

/* importar o modulo do consign */

var consign = require('consign');

/* importar o bodyparser */

var bodyParser = require('body-parser');

/*importar o modulo do express validator */

var expressValidator = require('express-validator');

/*iniciar o objeto do express */

var app = express();

/*setar as variaveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views','./app/views');

/*configurar o middleware express.static */
app.use(express.static('./app/public'));

/*configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended : true}));

/*configurar o middleware express-validator */
app.use(expressValidator());

/*efetua o autoload das rotas/models/controllers para o objeto app */
consign()
    .include('app/routes')
    .then('app/controllers')
    .into(app);


/** exportar o objeto app */


module.exports = app;