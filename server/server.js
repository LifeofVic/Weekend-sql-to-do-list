const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/task.router');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/task', taskRouter);

app.listen(PORT, () => {
	console.log('Server listening on PORT: ', PORT);
});