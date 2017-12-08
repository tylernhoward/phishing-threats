# Phishing Threats Visualization
[![Build Status](https://travis-ci.org/tylernhoward/phishing-threats.svg?branch=master)](https://travis-ci.org/tylernhoward/phishing-threats)
### Overview

Angular based application aimed at visualizing current online phishing threats across the world. Data is retrieved from [PhishTank](http://www.phishtank.com/), and is presented in the form of geo-location data on a map, dynamic charts, and a filterable grid. Makes use of the [PhishTank API](https://www.phishtank.com/developer_info.php), Google Maps API, and [FreeGeoIP API](http://freegeoip.net).

Up-to-date Heroku instance is online at: http://phishing-threats.herokuapp.com

### Dependencies

**Make sure you have [Node.js](https://nodejs.org/en/) installed**

The other dependencies are installed during the set-up steps, but to name a few fun ones:

- **[Angular Google Maps (AGM)](https://angular-maps.com)** to make use of Google Map API
- **[Angular 2 Charts (ng2-charts)](https://valor-software.com/ng2-charts/)** to make use of the popular Chart.js library
- **[Ng2-scroll-to](https://www.npmjs.com/package/ng2-scroll-to)** to animate scrolling to anchor links
- **[Express](https://expressjs.com/) w/ [Axios](https://www.npmjs.com/package/axios)** as API layer for HTTP requests.

(I guess this could be called an *[EAN app](https://en.wikipedia.org/wiki/MEAN_(software_bundle))* since it is missing Mongo DB)

### Set-up

Naturally, the first step is to clone the repository to your local machine using Git.
```
git clone https://github.com/tylernhoward/phishing-threats.git
```
After this, simply navigate to the directory.
```
cd phishing-threats
```
Next, you want to install all the required dependencies for the project.
```
npm install
```
And finally, the last step is to build the project and start the server. To do this, simply run:
```
npm start
```
The application is now running at http://localhost:3000

### Further Development

In the case you wish to make additions or collaborate in some way, it is important to note that CI is set up through Travis, and the specified tests must pass for the build to succeed. See the .spec files within the project. You can see test results by running `npm test` or `ng test -sm false`
