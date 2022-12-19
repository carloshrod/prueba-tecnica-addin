const { Router } = require('express');
const pkg = require('../../package.json');
const { authRoutes } = require('./auth.routes');
const { productRoutes } = require('./product.routes');

const router = Router();

// Ruta principal
router.get('/', (req, res) => {
    res.send(`
    <b>Name:</b> ${pkg.name}<br>
    <b>Author:</b> ${pkg.author}<br>
    <b>Version:</b> ${pkg.version}
    `)
});

router.use("/api/auth", authRoutes);
router.use("/api/products", productRoutes);

exports.router = router;
