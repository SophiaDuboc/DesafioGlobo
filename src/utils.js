const date = require('date-and-time');

function getDateNow(){
    return date.format(new Date(), 'DD/MM/YYYY hh:mm:ss');
  }

function isUrl(url){
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g);
    let isUrl = (res != null);
    return isUrl;
}

module.exports = { getDateNow , isUrl }