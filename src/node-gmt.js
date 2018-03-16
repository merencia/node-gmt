'use strict';
module.exports = (function(){
    function GMT(entry) {
        if(typeof entry === 'string'){
            var reg = /^GMT(\+|\-)(\d{2})\:(\d{2})$/;
            var match = reg.exec(entry);
            this.signal = match[1];
            this.hours = parseInt(match[2]);
            this.minutes = parseInt(match[3]);
        } else {
            this.signal = this.offsetInMinutes < 0 ? '+' : '-';
            this.offsetInMinutes = Math.abs(entry);
            this.hours = this.offsetInMinutes / 60;
            this.minutes = this.offsetInMinutes % 60;
        }
    }
    
    GMT.prototype.getUTCDiff = function(){
        var offset = (this.hours * 60 + this.minutes) * 60000;
        if(this.signal === '-'){
            return offset * -1;
        }
        return offset;
    }
    
    GMT.prototype.getUTCTime = function(date){
        var currentOffset = date.getTimezoneOffset() * 60000;
        if(currentOffset > 0) {
            return date.getTime() + currentOffset;
        } 
        return date.getTime() - currentOffset;
    }
    
    GMT.prototype.toString = function(){
        return 'GMT' + this.signal + this.hours.toString().padStart(2, '0') + ':' + this.minutes.toString().padStart(2, '0')
    }
    
    GMT.prototype.relativeDate = function(date){
        var dateUtcTime = this.getUTCTime(date);
        return new Date(dateUtcTime + this.getUTCDiff());
    }
    
    GMT.current = function (){
        var offsetInMinutes = new Date().getTimezoneOffset();
        return new GMT(offsetInMinutes);
    }

    return GMT;
})();