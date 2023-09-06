"use strict";
const express = require('express');
const app = express();
const PORT = 8080;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express Server!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
