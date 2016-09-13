import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import {resolve, reject} from "bluebird";

chai.use(chaiAsPromised);
chai.use(sinonChai);

import {handler} from "index";
import pipeline from "pipeline";
import {getEventFromObject, run} from "../mock";

describe("`On sending email`", () => {

    const log = {
        info: sinon.spy(),
        debug: sinon.spy(),
        error: sinon.spy()
    };

    before(async () => {
        pipeline.__Rewire__("log", log);
    });

    after(async () => {
        pipeline.__ResetDependency__("log");
    });

    beforeEach(async () => {
        log.info.reset();
        log.debug.reset();
        log.error.reset();
    });

    const getEvent = element => ({
        id: "eventId",
        data: {
            element,
            id: "d0f7c9b4-ef6b-45c8-b216-723e78a6fe72"
        },
        type: "element inserted in collection emails"
    });

    describe("on promise resolved", () => {

        const ses = {
            sendEmail: sinon.stub().returns({promise: resolve})
        };

        before(async () => {
            pipeline.__Rewire__("ses", ses);
        });

        after(async () => {
            pipeline.__ResetDependency__("ses");
        });

        it("Send mail with exisisting address", async () => {

            var element = {
                toAddresses: ["test@email.com"],
                message: "test",
                subject: "test",

            };

            var sesElement = {
                Destination: {
                    ToAddresses: ["test@email.com"]
                },
                Message: {
                    Body: {
                        Text: {
                            Data: "test"
                        }
                    },
                    Subject: {
                        Data: "test"
                    }
                },
                Source: "noreply@innowatio.it"
            };

            const event = getEventFromObject(getEvent(element));
            await run(handler, event);
            expect(ses.sendEmail).to.have.callCount(1);
            expect(ses.sendEmail).to.have.been.calledWithExactly(sesElement);

            return ses.sendEmail().promise().delay(1000).then(() => {
                expect(log.info).to.have.callCount(1);
                expect(log.debug).to.have.callCount(2);
            });
        });

    });

    describe("on promise rejected", () => {

        const ses = {
            sendEmail: sinon.stub().returns({
                promise: () => reject(Error("error"))
            })
        };

        before(async () => {
            pipeline.__Rewire__("ses", ses);
        });

        after(async () => {
            pipeline.__ResetDependency__("ses");
        });

        it("Send mail with exisisting address", async () => {

            var element = {
                toAddresses: ["test@email.com"],
                message: "test",
                subject: "test",

            };

            var sesElement = {
                Destination: {
                    ToAddresses: ["test@email.com"]
                },
                Message: {
                    Body: {
                        Text: {
                            Data: "test"
                        }
                    },
                    Subject: {
                        Data: "test"
                    }
                },
                Source: "noreply@innowatio.it"
            };

            const event = getEventFromObject(getEvent(element));
            await run(handler, event);
            expect(ses.sendEmail).to.have.callCount(1);
            expect(ses.sendEmail).to.have.been.calledWithExactly(sesElement);

            return ses.sendEmail().promise().delay(1000).catch(() => {
                expect(log.error).to.have.callCount(1);
            });
        });

    });
});
