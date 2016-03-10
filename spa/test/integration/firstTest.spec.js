'use strict';

var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;


describe('using promises and chai-as-promised', function () {
    var driver;
    var desiredCapabilities = {
        'appium-version': '1.0',
        platformName: 'iOS',
        //platformVersion: '9.2',
        deviceName: 'Philippe\'s iPhone (9.2.1) [c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0]',
        //app: '/Users/phmo/Library/Developer/Xcode/DerivedData/iOSApp-bymaymuzrtclheafckstrhidbjkr/Build/Products/Debug-iphoneos/iOSApp.app'
        //udid: 'c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0'
    };

    this.timeout(514229);

    before(function () {
        driver = wd.promiseChainRemote('0.0.0.0', 4723);

        return driver
            .init(desiredCapabilities);
    });

    beforeEach(function () {
        return driver
            .elementByName('Second').click();
    });
    
    after(function () {
        return driver.quit();
    });

    it('should get current balance from the plugin', function () {
        return driver
            .elementByName('First').click()
            .elementByName('Second').click()
            .contexts()
            .then(function (contexts) { // get list of available views
                    console.log('= 2 =');
                    console.log('Switch to context: ' + contexts[1]);
                    return driver.context(contexts[1]); // choose what is probably the webview context
                },
                function (error) {
                    console.log(error);
                })
            .elementByCss('.balanceMenuLink')
            .click()
            .elementByCss('.currentBalanceDiv')
            .text()
            .then(function (text) {
                console.log(text);
            });
    });
});
