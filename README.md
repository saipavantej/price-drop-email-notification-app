### Setup

To clone the repository on your computer 
```bash
$ git clone https://github.com/saipavantej/price-drop-email-notification-app.git
$ cd price-drop-email-notification-app.git
```

To install dependencies
```bash
$ npm install
```
create **config.env** file and add the following information
```config.env
SENDGRID_API_KEY = --enter your SendGrid API key--
MAIL_TO_CUSTOMER = --enter E-mail ID--
MAIL_TO_DEVELOPER = --enter E-mail ID--
MAIL_FROM = --enter E-mail ID--
```

To run the project itself
```bash
$ npm start product-link minimum-price-limit
```
### Project Dependencies
> * [nightmare](https://www.npmjs.com/package/nightmare)
> * [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail)
> * [dotenv](https://www.npmjs.com/package/dotenv)

### How to Target **price block** form a website
> * Go to the product page 
> * Open developer tools in browser
> * click on select element tool
> * hover over the price block 

### [amazon.in](https://www.amazon.in/)
![amazon.in](https://github.com/saipavantej/price-drop-email-notification-app/blob/master/images/amazon.in.png)

### [flipkart.com](https://www.flipkart.com/)
![flipkart.com](https://github.com/saipavantej/price-drop-email-notification-app/blob/master/images/flipkart.com.png)

### To compare product price with the minimum price limit
> * use **regEx** to remove unwanted data _e.g (₹2,500) -> (2500)_
