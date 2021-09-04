const express = require('express');
const app = express();
const port = process.env.port || 3002;
const path = require('path');

app.use(express.static('./dist'));
app.get('/*', (req, res) => {
	res.sendFile(path.join('./dist', 'index.html'));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
