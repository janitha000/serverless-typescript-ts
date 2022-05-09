import { expect } from 'chai';
import * as lambdaTester from 'lambda-tester';
import * as proxyquire from 'proxyquire;'
import { main } from '../src/functions/mongo/getUsers'

// const mockData = {
//     test: 'testdata'
// }

describe('mongo function', () => {
    let lambda = null;
    let dataStub = {};
    beforeEach(function () {
        // Exporting the lambda with mock dependencies
        lambda = proxyquire.noCallThru().load("../src/functions/mongo/getUsers", {
            "../dataService/data": dataStub,
        });
    });


    it('should get mongo users', async () => {
        await lambdaTester(main)
            .expectResult((result) => {
                console.log(result)
                // Check if code exist
                expect(result.statusCode).to.exist;

                // Check if code = 200
                expect(result.statusCode).to.equal(200);

                // Check if data exist
                expect(result.body).to.exist;

                // Check if data is an array
                expect(result.body).to.be.equal('{"message":"Hello, welcome to the exciting Serverless world!","url":"undefined/hello","event":{}}');

            })
    })


})
