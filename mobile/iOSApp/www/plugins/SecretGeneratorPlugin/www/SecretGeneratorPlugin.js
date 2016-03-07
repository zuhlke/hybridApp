cordova.define("SecretGeneratorPlugin.SecretGenerator", function(require, exports, module) {

var exec = require('cordova/exec');

var SecretGenerator = {
  generateSecret:function(args, successCallback, errorCallback) {
    console.log(args);
    exec(successCallback, errorCallback, "SecretGeneratorPlugin", "generateSecret", args);
  },
  subscribe: function (successCallback) {
    exec(successCallback, null, "SecretGeneratorPlugin", "subscribe", []);
  }
};

module.exports = SecretGenerator;

});
