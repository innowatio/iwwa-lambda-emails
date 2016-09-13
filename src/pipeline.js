import {config} from "aws-sdk";
import {Promise} from "bluebird";

import ses from "./services/email-sender";
import log from "./services/logger";
import {MAIL_FROM} from "config";

export default async function (event) {
    log.debug("Incoming: ", event);
    const element = event.data.element;
    if (!element) {
        return null;
    }

    config.setPromisesDependency(Promise);

    var eParams = {
        Destination: {
            ToAddresses: element.toAddresses
        },
        Message: {
            Body: {
                Text: {
                    Data: element.message
                }
            },
            Subject: {
                Data: element.subject
            }
        },
        Source: MAIL_FROM
    };

    await ses.sendEmail(eParams).promise().then(data => {
        log.info("===EMAIL SENT===");
        log.debug(data);
    }).catch(err => {
        log.error("Error", err);
    });
    return null;
}
