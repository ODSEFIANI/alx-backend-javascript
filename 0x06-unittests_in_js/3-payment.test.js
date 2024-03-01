// 3-payment.test.js
const sinon = require('sinon');
const assert = require('assert');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  let calculateNumberStub;

  beforeEach(() => {
    calculateNumberStub = sinon.stub(Utils, 'calculateNumber');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call Utils.calculateNumber with correct arguments', () => {
    calculateNumberStub.returns(120);

    sendPaymentRequestToApi(100, 20);

    sinon.assert.calledOnce(calculateNumberStub);
    sinon.assert.calledWithExactly(calculateNumberStub, 100, 20);
  });
});
