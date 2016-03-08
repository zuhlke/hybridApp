import XCTest
@testable import iOSApp

class iOSAppTests: XCTestCase {
    
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testCDVSecretGeneratorPlugin() {
        
        // Arrange
        let message = "test message"
        let secretGeneratorPlugin = CDVSecretGeneratorPlugin()
        let commandDelegateMock = CommandDelegateMock()
        let command = CDVInvokedUrlCommand(
            arguments: [message],
            callbackId: "testCallbackId",
            className: "CDVSecretGeneratorPlugin",
            methodName: "generateSecret"
        )
        
        secretGeneratorPlugin.commandDelegate = commandDelegateMock
        
        // Act
        secretGeneratorPlugin.generateSecret(command)
        
        // Assert
        let result = secretGeneratorPlugin.commandDelegate as! CommandDelegateMock
        
        XCTAssertEqual(command.callbackId, result.getCallbackId())
        XCTAssertEqual("Hello \(message)", result.getResult().message as? String)
    }
    
    func testFailing() {
        XCTAssertTrue(false)
    }

    
    func testPerformanceExample() {
        // This is an example of a performance test case.
        self.measureBlock {
            // Put the code you want to measure the time of here.
        }
    }
    
    class CommandDelegateMock : NSObject, CDVCommandDelegate {
        
        var result: CDVPluginResult!
        var callbackId: String!
        
        func getResult() -> CDVPluginResult! {
            return self.result
        }
        
        func getCallbackId() -> String {
            return self.callbackId
        }
    
        var settings: [NSObject:AnyObject]! {
            return nil
        }
        var urlTransformer: UrlTransformerBlock {
            get {
                return self.urlTransformer
            }
            set {
            }
        }
        
        func pathForResource(resourcepath: String!) -> String! {
            return nil
        }
        
        func getCommandInstance(pluginName: String!) -> AnyObject! {
            return nil
        }
        
        func sendPluginResult(result: CDVPluginResult!, callbackId: String!) {
            self.result = result
            self.callbackId = callbackId
        }
        
        func evalJs(js: String!) {
        }
        
        func evalJs(js: String!, scheduledOnRunLoop: Bool) {
        }
        
        func runInBackground(block: () -> ()) {
        }
        
        func userAgent() -> String! {
            return nil
        }
    }
}
