const PORT = 8050 
const express = require('express')
const cors = require('cors') 
const axios = require('axios') 
require('dotenv').config()

const app = express() 
app.listen(8050, () => console.log('server is running'))