const express = require('express')
const app = express();
const cors = require('cors');
const { PORT } = require("./config");

app.use(cors());

app.use(express.json({limit: '50mb'}))

//Exportar Rutas
const profile_routes = require('./routes/profileroute');
const state_routes = require('./routes/stateroute');
const category_routes = require('./routes/categoryroute');
const new_routes = require('./routes/newroute');
const user_routes = require('./routes/Userroute');
const auth_routes = require('./routes/authroute');



//Usar las rutas
app.use('/api', profile_routes);
app.use('/api', state_routes);
app.use('/api', category_routes);
app.use('/api', new_routes);
app.use('/api', user_routes);
app.use('/api', auth_routes);

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});

module.exports = app;