// 2-calcul_chai.test.js
const chai = require('chai');
const expect = chai.expect;
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', () => {
  it('should round and perform SUM operation', () => {
    expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
  });

  it('should round and perform SUBTRACT operation', () => {
    expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
  });

  it('should round and perform DIVIDE operation', () => {
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
    expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
  });
});
