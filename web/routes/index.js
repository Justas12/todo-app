const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'hello world!',
    });
});

router.get('/:id', (req, res) => {
    res.json({
        id: req.params.id,
        todo: 'todo',
    });
});

module.exports = router;