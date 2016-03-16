'use strict';

var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.expect();
var expect = chai.expect;
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var testConfigurationForIos = {
    name: 'iOS',
    port: 4723,
    desiredCapabilities: {
        'appium-version': '1.0',
        platformName: 'iOS',
        //platformVersion: '9.2',
        deviceName: 'Philippe\'s iPhone', // (9.2.1) [c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0]',
        app: '/Users/phmo/Library/Developer/Xcode/DerivedData/iOSApp-bymaymuzrtclheafckstrhidbjkr/Build/Products/Debug-iphoneos/iOSApp.app',
        udid: 'c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0'
    }
};
var testConfigurationForAndroid = {
    name: 'Android',
    port: 4723,
    desiredCapabilities: {
        'appium-version': '1.0',
        platformName: 'Android',
        deviceName: 'b083be90',
        app: '/Users/phmo/_Zuhlke/Source/git/hybridApp/mobile/AndroidApp/app/build/outputs/apk/app-debug.apk'
    }
};
//var testConfigurations = [testConfigurationForIos];
var testConfigurations = [testConfigurationForIos, testConfigurationForAndroid];

testConfigurations.forEach(function (testConfigurations) {
    describe('[' + testConfigurations.name + '] Basic tests for finding & clicking elements and typing text & rotate device', function () {
        
        var driver;
        this.timeout(514229);

        before(function () {
            driver = wd.promiseChainRemote('0.0.0.0', testConfigurations.port);

            return driver
                .init(testConfigurations.desiredCapabilities);
        });

        beforeEach(function () {
            //return driver
            //    .contexts(switchToNativeContext)
            //.elementByAccessibilityId('xyz').click();
            //    .elementById(42).click();
            //    .elementByName('Second').click();
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
                .elementByName('Second')
                .click()
                .contexts()
                .then(switchToFirstWebViewContext, function (error) {
                    console.log(error);
                })
                .waitForElementById('balanceMenuLink')
                .click()
                .waitForElementById('currentBalanceDiv')
                .text(function (text) {
                    return text;
                }))
                .to.eventually.be.equal('Hello World!')
        });
        
        it('should enter text into native text field and hide key board when finished', function () {
            return expect(driver
                .elementByName('Second').click()
                .elementById('SecondViewTextFieldAccessibilityId')
                .type('Hello World!')
                .keys(wd.SPECIAL_KEYS.Return)
                .elementByAccessibilityId('SecondViewTextFieldAccessibilityId')
                .text(function (text) {
                    return text;
                }))
                .to.eventually.be.equal('Hello World!');
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

        it('should rotate device to landscape and back to portrait', function () {
            return driver
                .setOrientation('LANDSCAPE')
                .setOrientation('PORTRAIT');
        });

        //it('should click on native Android buttons', function () {
        //    return driver
        //        .waitForElementByAccessibilityId('RightButtonAccessibilityId')
        //        .click()
        //        .waitForElementByAccessibilityId('LeftButtonAccessibilityId')
        //        ;
        //});
    });
});
