const dotenv = require("dotenv");
dotenv.config({path:"config.env"});
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nightmare = require("nightmare")();
const args = process.argv.slice(2);
console.log(args);
const url = args[0];
const minprice = parseFloat(args[1]);
const amazon = /[₹,\s,\,]/g; // amazon.com price  "span#priceblock_ourprice.a-size-medium.a-color-price.priceBlockBuyingPriceString"
const flipkart =/[₹,\,]/g;  //  flipkart.com price  "div._1vC4OE._3qQ9m1"
checkPrice();
async function checkPrice() {
    try {
        const priseString = await nightmare.goto(url)
            .wait("span#priceblock_ourprice.a-size-medium.a-color-price.priceBlockBuyingPriceString")
            .evaluate(() => document.querySelector("span#priceblock_ourprice.a-size-medium.a-color-price.priceBlockBuyingPriceString").innerText)
            .end();
        const priceNumber = parseFloat(priseString.replace(amazon, ""));
        if (priceNumber < minprice) {
            sendEmail("Product price drop", `The price of ${url} has dropped below ₹${minprice} current prise is ₹${priceNumber}`);
            console.log(`price drop message sent to ${process.env.MAIL_TO}`);
        }
        else
        {
            console.log(`price drop message not sent to ${process.env.MAIL_TO} \nno price drop \nproduct current price is (₹${priceNumber}) greater than (₹${minprice})`);
        }
    } catch (e) {
        sendEmail("price checker error ", e.message);
        console.log(`${e}`);
    }
}
function sendEmail(subject, body) {
    const email = {
        to: process.env.MAIL_TO,
        from: process.env.MAIL_FROM,
        subject: subject,
        text: body,
        html: body
    }
    return sgMail.send(email);
}
