import "babel-polyfill";
import router from "kinesis-router";

import sendEmail from "services/mail-sender";

export const handler = router()
    .on("email sent", sendEmail);