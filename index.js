// Section A: Import libraries

const mailer = require("nodemailer");
const express = require("express");
const chalk = require("chalk");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const _ = require("lodash");
const axios = require("axios");
const Jimp = require("jimp");
const send = require("send");

// Section B:  Generate instances

// EXERCISE 7
const app = express();
    app.listen(80,() => {
        console.log("App listening at port 80")
    });

// Section C:  Define Middlewares and Routes

// EXERCISE 1
// function send(to, subject, text){}
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    })

    const mailOptions = {
        from: process.env.MAILER_USER,
        to: 'lapivette@gmail.com',
        subject: 'Exercising mailer from my App',
        text: '🎈🎉 💃🏻🕺🏻👯‍♂️ 🎊🎀'
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err)
        if (data) console.log(data)
      });


// EXERCISE 2
console.log(chalk.bgYellowBright.green(process.env.MAILER_USER));

// EXERCISE 3
let id = uuidv4()
// const idx_last = id.length - 1;
const idx_6 = id.length - 6;
console.log(id.slice(idx_6));

// EXERCISE 4
console.log(moment().add(10, "days").format("dddd"));

// EXERCISE 5
const numbers = [true, 0, null, undefined, '', 22, false, "text"]
const partition = _.partition(numbers, Boolean)
console.log(partition);

// EXERCISE 6
axios.get("https://mindicador.cl/api")
  .then(({data}) => {
    console.log(data.dolar)
  })
  .catch(err => {console.log("Cannot get the information")})

// EXERCISE 7
app.get("/", async (req, res) =>{
    const img = await Jimp.read ("https://images.pexels.com/photos/3732646/pexels-photo-3732646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    await img
    .resize (240, Jimp.AUTO)
    .grayscale ()
    .quality(60)
    .writeAsync ("img.png") 
  // response for a user
    res.setHeader("Content-Type", "image/png") //aca se fuerza a que sea contenido del tipo imagen
    res.sendFile(__dirname + "/img.png")
  });


// Section D:  Define generic route
