const express = require('express');
const router = express.Router();

const axios = require('axios');
const phishTankAPI = 'http://data.phishtank.com/data/a378674c7e664de0effa97a404e7b3e0ff45efb82fc736df2c62e6a5a3e3cda3/online-valid.json';
router.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Get all phishing reports
router.get('/data', (req, res) => {
    // This should ideally be replaced with a service that connects to MongoDB
    axios.get(`${phishTankAPI}`)
        .then(phish => {
            res.status(200).json(phish.data);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});


const Ip2GeoAPI = 'http://freegeoip.net/json';
// Get specific phishing reports
router.get('/locations/:ip', (req, res) => {
    // This should ideally be replaced with a service that connects to MongoDB
    const iptofind = req.params.ip;
    axios.get(`${Ip2GeoAPI}/${iptofind}`)
        
        .then(location => {
            res.status(200).json(location.data);
        })
        .catch(error => {
            res.status(500).send(error)
        });
});

module.exports = router;