'use strict';

var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;


describe('using promises and chai-as-promised', function () {
    var browser;
    var desiredCapabilities = {
        'appium-version': '1.0',
        platformName: 'iOS',
        //platformVersion: '9.2',
        //deviceName: 'Philippe\'s iPhone (9.2.1) [c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0]',
        //app: '/Users/phmo/Library/Developer/Xcode/DerivedData/iOSApp-bymaymuzrtclheafckstrhidbjkr/Build/Products/Debug-iphoneos/iOSApp.app'
        //udid: 'c6b7bd9947354b61c920b7ec51e05e5d7af4e0c0'
    };

    this.timeout(514229);

    before(function () {
        browser = wd.promiseChainRemote('0.0.0.0', 4723);

        //browser.contexts().then(
        //    function resolve(contexts) {
        //        console.log(contexts);
        //    },
        //    function reject(error) {
        //        console.log(error);
        //    });

        return browser
            .init(desiredCapabilities);
    });

    //beforeEach(function () {
    //    //return browser
    //    //    .elementByName('Second').click();
    //});
    //
    after(function () {
        return browser.quit();
        //return browser
        //    .elementByName('First').click();
    });

    it('should get current balance from the plugin', function () {
        return browser
            .elementByName('Second').click()
            .elementByName('First').click()
            .elementByName('Second').click()
            .elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIAWebView[1]/UIALink[1]").click();
        //.contexts()
        //.context("WEBVIEW")
        //.elementById("balanceMenuLink").click();

        //var contexts = browser.context();
        //console.log(contexts);

        //return browser;
        //.elementByName('balanceMenuLink').click();
        //.elementById('currentBalanceDiv')
        //.innerHTML.expect.to.be.equal('Hallo Welt!')
    });
});

//describe('Testing the chats tab', function() {
//    it('should be able to click on the chats tab', function() {
//        var secondTapElement = element(by.xpath('//UIAApplication[1]/UIAWindow[1]/UIATabBar[1]/UIAButton[2]'));
//        console.log('============== START ============');
//        console.log(secondTapElement);
//        console.log('============== END ============');
//        return secondTapElement.click();
//        //element(by.name('First')).click();
//    });
//});
