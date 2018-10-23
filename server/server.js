const express = require('express')
    , bodyParser = require('body-parser')
    , usersCtrl = require('./usersCtrl');

const app = express();

app.use(bodyParser.json());

// ENDPOINTS //
app.get('/api/users', usersCtrl.getAllUsers);
app.get('/api/users/:id', usersCtrl.getUserById);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:type', usersCtrl.getUserByType);
app.put('/api/users/:id', usersCtrl.updateUserById);
app.post('/api/users', usersCtrl.addUserId);
app.delete('/api/users/:id', usersCtrl.deleteUserById);

const PORT = 3000

app.listen(PORT, () => {
    console.log(`think about all the things you will learn if you do this! ${PORT} you got this girl!`)
})