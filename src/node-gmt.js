'use strict';
module.exports = (function () {
    
    /**
     * Retrieve the date timestamp at GMT+00:00
     * @param {Date} date 
     * @returns {Number} timestamp
     */
    function retrieveUTCTime(date) {
        var currentOffset = date.getTimezoneOffset() * 60000;
        if (currentOffset > 0) {
            return date.getTime() + currentOffset;
        }
        return date.getTime() - currentOffset;
    }
    
    /**
     * Creates a GMT
     * @param {String} entry GMT representation e.g: GMT-03:00  
     * @param {Number} entry GMT offset in minutes (Date.getTimezoneOffset return)
     */
    function GMT(entry) {
        if (typeof entry === 'string') {
            var reg = /^GMT(\+|\-)(\d{2})\:(\d{2})$/;
            var match = reg.exec(entry);
            this.signal = match[1];
            this.hours = parseInt(match[2]);
            this.minutes = parseInt(match[3]);
            this.offsetInMinutes = this.hours * 60 + this.minutes;
        } else {
            this.signal = entry < 0 ? '+' : '-';
            this.offsetInMinutes = Math.abs(entry);
            this.hours = Math.floor(this.offsetInMinutes / 60);
            this.minutes = this.offsetInMinutes % 60;
        }
    }

    /**
     * @returns {Number} difference beetwen the gmt and GMT+00:00 in miliseconds  
     */
    GMT.prototype.getUTCDiff = function () {
        var offset = (this.hours * 60 + this.minutes) * 60000;
        if (this.signal === '-') {
            return offset * -1;
        }
        return offset;
    }

    GMT.prototype.toString = function () {
        return 'GMT' + this.signal + this.hours.toString().padStart(2, '0') + ':' + this.minutes.toString().padStart(2, '0')
    }

    GMT.prototype.relativeDate = function (date) {
        var dateUtcTime = retrieveUTCTime(date);
        return new Date(dateUtcTime + this.getUTCDiff());
    }

    GMT.getCurrent = function () {
        var offsetInMinutes = new Date().getTimezoneOffset();
        return new GMT(offsetInMinutes);
    }

    return GMT;
})();