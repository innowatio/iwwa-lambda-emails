import {SES} from "aws-sdk";
import {AWS_ACCESS_KEY, AWS_SECRET_KEY} from "../config";

export default new SES({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccesskey: AWS_SECRET_KEY,
    region: "eu-west-1"
});
