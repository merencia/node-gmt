
var expect = require('expect.js');
var GMT = require('../src/node-gmt'); 


describe('node-gmt', () => {
    it('should retrieve local gmt', ()=>{
        var currentGmt = GMT.getCurrent();
        var offset = new Date().getTimezoneOffset() * -60000;
        expect(offset).equal(currentGmt.getUTCDiff());
    });

    it('should create a negative GMT by yours representation string', ()=>{
        var gmt = new GMT('GMT-03:00');
        expect(gmt.hours).equal(3);
        expect(gmt.minutes).equal(0);
        expect(gmt.signal).equal('-');
        expect(gmt.offsetInMinutes).equal(180);
        expect(gmt.getUTCDiff()).equal(-180 * 60000);
    });

    it('should create a positive GMT by yours representation string', ()=>{
        var gmt = new GMT('GMT+04:30');
        expect(gmt.hours).equal(4);
        expect(gmt.minutes).equal(30);
        expect(gmt.signal).equal('+');
        expect(gmt.offsetInMinutes).equal(270);
        expect(gmt.getUTCDiff()).equal(270 * 60000);
    });

    it('should create a negative GMT by offset', ()=>{
        var gmt = new GMT(180);
        expect(gmt.hours).equal(3);
        expect(gmt.minutes).equal(0);
        expect(gmt.signal).equal('-');
        expect(gmt.offsetInMinutes).equal(180);
        expect(gmt.getUTCDiff()).equal(-180 * 60000);
        expect(gmt.toString()).equal('GMT-03:00');
    });

    it('should create a positive GMT by offset', ()=>{
        var gmt = new GMT(-270);
        expect(gmt.hours).equal(4);
        expect(gmt.minutes).equal(30);
        expect(gmt.signal).equal('+');
        expect(gmt.offsetInMinutes).equal(270);
        expect(gmt.getUTCDiff()).equal(270 * 60000);
        expect(gmt.toString()).equal('GMT+04:30');
    });

    it('should retrieve the relative date at GMT+00:00', ()=>{
        var gmt = new GMT('GMT+00:00');
        var date = new Date('August 1, 2018 00:00:00 GMT-04:30');
        var relativeDate = gmt.relativeDate(date);
        expect(relativeDate.getHours()).equal(4);
        expect(relativeDate.getMinutes()).equal(30);
    });

    it('should retrieve the relative date at GMT+02:00', ()=>{
        var gmt = new GMT('GMT+02:00');
        var date = new Date('August 1, 2018 00:00:00 GMT-04:30');
        var relativeDate = gmt.relativeDate(date);
        expect(relativeDate.getHours()).equal(6);
        expect(relativeDate.getMinutes()).equal(30);
    });

    it('should retrieve the relative date at GMT-6:00', ()=>{
        var gmt = new GMT('GMT-06:00');
        var date = new Date('August 1, 2018 00:00:00 GMT-04:30');
        var relativeDate = gmt.relativeDate(date);
        expect(relativeDate.getHours()).equal(22);
        expect(relativeDate.getMinutes()).equal(30);
        expect(relativeDate.getDate()).equal(31);
        expect(relativeDate.getMonth()).equal(6);
    });
});