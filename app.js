const dotenv = require("dotenv");
dotenv.config({path:"config.env"});
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nightmare = require("nightmare")();
const args = process.argv.slice(2);
console.log(args);
const url = args[0];
const minprice = parseFloat(args[1]);
const amazon = /[₹,\s,\,]/g;
const flipkart =/[₹,\,]/g;
checkPrice();
async function checkPrice() {
    try {
        const priseString = await nightmare.goto(url)
            .wait("div._1vC4OE._3qQ9m1")
            .evaluate(() => document.querySelector("div._1vC4OE._3qQ9m1").innerText)
            .end();
        const priceNumber = parseFloat(priseString.replace(flipkart, ""));
        if (priceNumber < minprice) {
            sendEmail("Product price drop", `The price of ${url} has dropped below ${minprice} \n current prise is ${priceNumber}`);
            console.log(`price drop message sent to ${process.env.MAIL_TO}`);
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
