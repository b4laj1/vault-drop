require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileRoutes = require('./src/routes/apiRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));