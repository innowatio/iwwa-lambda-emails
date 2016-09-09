import {SES} from "aws-sdk";
import {AWS_ACCESS_KEY, AWS_SECRET_KEY} from "../config";

const ses = new SES({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccesskey: AWS_SECRET_KEY,
    region: "eu-west-1"
});

export default function sendEmail(event) {
    console.log("Incoming: ", event);

    var eParams = {
        Destination: {
            ToAddresses: [event.data.toAddresses]
        },
        Message: {
            Body: {
                Text: {
                    Data: event.data.mailContent
                }
            },
            Subject: {
                Data: event.data.mailSubject
            }
        },
        Source: "noreply@innowatio.it"
    };

    var email = ses.sendEmail(eParams, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("===EMAIL SENT===");
            console.log(data);
        }
    });
    console.log("EMAIL: ", email);
    return null;
}