
var expect = require('expect.js');
var GMT = require('../src/node-gmt'); 


describe('node-gmt', () => {
    it('should retrieve local gmt', ()=>{
        var currentGmt = GMT.current();
        var offset = new Date().getTimezoneOffset() * -60000;
        expect(offset).equal(currentGmt.getUTCDiff());
    });
});