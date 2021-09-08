const express = require('express');
const app = express();
const port = process.env.port || 3001;
const path = require('path');

const WORK_DIR = process.env.PWD;

app.use(express.static('./dist'));
app.get('/*', (req, res) => {
	res.sendFile(path.join(WORK_DIR, 'dist/index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
