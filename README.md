# Phishing Threats Visualization

### Overview
Angular based application aimed at visualizing current online phishing threats across the world. Data is retrieved from PhishTank, and is presented in the form of geo-location data on a map, dynamic charts, and a filterable grid. Makes use of the PhishTank API, Google Maps API, and FreeGeoIP API.

Up-to-date Heroku instance is online at: (http://phishing-threats.herokuapp.com)

### Dependencies
**Make sure you have Node.js installed**
Included during installation of node modules, but to name a few fun ones:
- **Angular Google Maps (AGM)** to make use of Google Map API
- **Angular 2 Charts (ng2-charts)** to make use of the popular Chart.js library
- **Ng2-scroll-to** to animate scrolling to anchor links
- **Express w/ Axios** as API layer for HTTP requests.

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
The application is now running at (http://localhost:3000)


