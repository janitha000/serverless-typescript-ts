import { expect } from 'chai';
import * as lambdaTester from 'lambda-tester';

import { main } from '../src/functions/hello/handler'

// const mockData = {
//     test: 'testdata'
// }

describe('hello function', () => {
    it('should call hello function', async () => {
        await lambdaTester(main)
            // .event(mockData) // Passing input data
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
