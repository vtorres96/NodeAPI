let config = require('../config')
let sendgrid = require('sendgrid')(config.sendgridKey)

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'victorcdc96@gmail.com',
        subject: subject,
        html: body
    })
}