import dotenv from "dotenv";
dotenv.load();

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const MAIL_FROM = process.env.MAIL_FROM || "noreply@innowatio.it";
