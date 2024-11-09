const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const cur__dirname = path.resolve(path.dirname(''));

app.use(express.static('./dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(cur__dirname, './dist/index.html'));
    res.status(200);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
