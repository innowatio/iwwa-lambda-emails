import "babel-polyfill";

import chai, {expect} from "chai";
import {spy} from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import {getEventFromObject} from "../mocks";
import {handler} from "index";

describe("Send email", () => {
    // TODO complete the unit test!!

    let context = {
        succeed: spy(),
        fail: spy()
    };

    beforeEach(async () => {
        context.succeed.reset();
        context.fail.reset();
    });

    it("Never fail", async () => {

        const userEvent = {
            data: {
                toAddresses: "john@doe.com",
                mailContent: "Just an example text.",
                mailSubject: "Just an example subject."
            },
            type: "email sent"
        };

        await handler(getEventFromObject(userEvent), context);
        expect(context.succeed).to.have.been.calledOnce;
    });
});
