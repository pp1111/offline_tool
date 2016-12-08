document.getElementById('setWebsite').websites.onchange = function() {
    document.getElementById('setWebsite').action = '?website=' + this.value;
    document.getElementById('setWebsite').submit();
};