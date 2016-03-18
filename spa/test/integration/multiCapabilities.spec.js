'use strict';

var _ = require('lodash');
var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.expect();
var expect = chai.expect;
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe('multi', function () {

    var drivers = [];
    var testConfigurations = [];
    this.timeout(514229);

    testConfigurations.push({
        port: 4721,
        desiredCapabilities: {
            platformName: 'iOS',

            deviceName: 'Philippe\'s iPhone',
            udid: 'c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0',

            app: '/Users/phmo/Library/Developer/Xcode/DerivedData/iOSApp-bymaymuzrtclheafckstrhidbjkr/Build/Products/Debug-iphoneos/iOSApp.app',
            fullReset: true
        }
    });

    testConfigurations.push({
        port: 4722,
        desiredCapabilities: {
            platformName: 'iOS',

            deviceName: 'Daniel Gartmann\'s iPhone',
            udid: 'a7071a33350c54f2d32154e4ec890f6829b2f0f7',

            app: '/Users/phmo/Library/Developer/Xcode/DerivedData/iOSApp-bymaymuzrtclheafckstrhidbjkr/Build/Products/Debug-iphoneos/iOSApp.app',
            fullReset: true
        }
    });

    testConfigurations.push({
        port: 4723,
        desiredCapabilities: {
            'appium-version': '1.0',
            platformName: 'Android',
            deviceName: 'b083be90',
            app: '/Users/phmo/_Zuhlke/Source/git/hybridApp/mobile/AndroidApp/app/build/outputs/apk/app-debug.apk'
        }
    });

    before(function () {
        drivers = _.map(testConfigurations, function (testConfiguration) {
            var driver = wd.promiseChainRemote('0.0.0.0', testConfiguration.port);
            driver.testConfiguration = testConfiguration;

            return driver;
        });

        var promises = _.map(drivers, function (driver) {
            return driver.init(driver.testConfiguration.desiredCapabilities);
        });

        return Promise.all(promises);
    });

    after(function () {
        var promises = _.map(drivers, function (driver) {
            return driver.quit();
        });

        return Promise.all(promises);
    });

    it('should enter text', function () {
        var promises = _.map(drivers, function (driver) {
            return expect(driver
                .waitForElementByAccessibilityId('MainTextAccessibilityId')
                .click()
                .type('Hello from tests!')
                .waitForElementByAccessibilityId('MainTextAccessibilityId')
                .text(function (text) {
                    return text;
                }))
                .to.eventually.be.equal('Hello from tests!')
                .catch(function (error) {
                    console.log(['[', driver.testConfiguration.desiredCapabilities.deviceName, ']'].join(''));
                    throw error;
                });
        });

        return Promise.all(promises);
    });
});