'use strict';

var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.expect();
var expect = chai.expect;
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

    afterEach(function () {
        return driver
            .contexts()
            .then(switchToNativeContext)
            .elementByName('First').click();
    });

    after(function () {
        return driver.quit();
    });

    it('should get current balance from the plugin', function () {
        return expect(driver
            .contexts()
            .then(switchToFirstWebViewContext, function (error) {
                console.log(error);
            })
            .waitForElementByCss('.balanceMenuLink')
            .click()
            .waitForElementByCss('.currentBalanceDiv')
            .text()
            .then(function (text) {
                return text;
            }))
            .to.eventually.be.equal('Hello World!')
    });

    it('should select second tab and enter some text into text field', function () {
        return driver
            .elementByAccessibilityId('SecondViewTextFieldAccessibilityId')
            .type('Hello World!')
            .keys(wd.SPECIAL_KEYS.Enter);
    });

    function switchToFirstWebViewContext(contexts) {
        return switchContext(contexts, 1);
    }

    function switchToNativeContext(contexts) {
        return switchContext(contexts, 0); 
    }

    function switchContext(contexts, index) {
        console.log('Available contexts: ' + contexts);
        console.log('Switch to context: ' + contexts[index]);
        return driver.context(contexts[index]); 
    }
});
