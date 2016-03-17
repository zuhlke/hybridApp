'use strict';

var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var q = require('q');

chai.use(chaiAsPromised);
chai.expect();
var expect = chai.expect;
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

describe('multi', function () {

    var drivers = [];
    var iOsDriver;
    var androidDriver;
    this.timeout(514229);

    var testConfigurationForIosPhilippe = {
        name: 'iOS',
        port: 4721,
        desiredCapabilities: {
            //'appium-version': '1.0',
            platformName: 'iOS',

            deviceName: 'Philippe\'s iPhone', // (9.2.1) [c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0]',
            udid: 'c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0',

            app: '/Users/phmo/Library/Developer/Xcode/DerivedData/iOSApp-bymaymuzrtclheafckstrhidbjkr/Build/Products/Debug-iphoneos/iOSApp.app',
            fullReset: true
        }
    };

    var testConfigurationForIosDaniel = {
        name: 'iOS',
        port: 4722,
        desiredCapabilities: {
            //'appium-version': '1.0',
            platformName: 'iOS',

            deviceName: 'Daniel Gartmann\'s iPhone',
            udid: 'a7071a33350c54f2d32154e4ec890f6829b2f0f7',

            app: '/Users/phmo/Library/Developer/Xcode/DerivedData/iOSApp-bymaymuzrtclheafckstrhidbjkr/Build/Products/Debug-iphoneos/iOSApp.app',
            fullReset: true
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

    before(function () {
        drivers.push(wd.promiseChainRemote('0.0.0.0', testConfigurationForIosPhilippe.port));
        drivers.push(wd.promiseChainRemote('0.0.0.0', testConfigurationForIosDaniel.port));
        drivers.push(wd.promiseChainRemote('0.0.0.0', testConfigurationForAndroid.port));

        return q.all([
            drivers[0]
                .init(testConfigurationForIosPhilippe.desiredCapabilities),
            drivers[1]
                .init(testConfigurationForIosDaniel.desiredCapabilities),
            drivers[2]
                .init(testConfigurationForAndroid.desiredCapabilities)
        ]);

        //return iOsDriver
        //    .init(testConfigurationForIos.desiredCapabilities);
    });

    after(function () {
        return q.all([
            drivers[0].quit(),
            drivers[1].quit(),
            drivers[2].quit()
        ]);
    });

    it('should rotate device to landscape and back to portrait', function () {
        var promise0 = drivers[0]
            .elementByName('Second')
            .click()
            .elementByName('First')
            .click()
            .elementByName('Second')
            .click()
            .elementByName('First')
            .click();
        var promise1 = drivers[1]
            .elementByName('Second')
            .click()
            .elementByName('First')
            .click()
            .elementByName('Second')
            .click()
            .elementByName('First')
            .click();
        var promise2 = drivers[2]
            .waitForElementByAccessibilityId('RightButtonAccessibilityId')
            .click()
            .waitForElementByAccessibilityId('LeftButtonAccessibilityId')
            .click()
            .waitForElementByAccessibilityId('RightButtonAccessibilityId')
            .click()
            .waitForElementByAccessibilityId('LeftButtonAccessibilityId')
            .click();

        return q.all([
            promise0, 
            promise1,
            promise2
        ]);
    });
});