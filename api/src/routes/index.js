const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Dogrouter = require("../routes/routeDogs");
const temperamentrouter = require("../routes/routeTemperament");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", Dogrouter);
router.use("/temperaments", temperamentrouter);

module.exports = router;
