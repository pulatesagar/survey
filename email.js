const nodemailer = require("nodemailer");
const file_path = 'D:/mywork/kevondemo/playwrightdemo/ApplicationTestReport/InvestorTestReport.html';

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '5ff5632e5d8705',
        pass: '9f17d9b33b39a9'
    }
});

const message = {
    from: 'rr.sagarp@gmail.com',
    to: 'lmd.abhijit@gmail.com',
    subject: 'QA: Investor Test Report',
    html: '<p>Please find the attachment report</p>',
    attachments: [
        { 
            filename: 'InvestorTestReport.html',
            path: file_path
        }
    ]
};
transport.sendMail(message, function (err, info) {
    if (err) 
    { 
        console.log(err) 
    }

    else {
        console.log('Email sent successfully');
    }
});