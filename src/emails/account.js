const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
sgMail.send({
    to: email,
    from: 'abdul.aliwork29@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app!`
})
}



const sendDeleteEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abdul.aliwork29@gmail.com',
        subject: 'We hope to see you again!',
        text: `Hey ${name}, we noticed you cancelled your account. Is there any way we can improve your experience?`
    })
}







module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}