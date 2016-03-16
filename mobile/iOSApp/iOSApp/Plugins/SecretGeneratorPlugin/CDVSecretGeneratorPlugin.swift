//
//  SecretGeneratorPlugin.swift
//  iOSApp
//
//  Created by Philippe Morier on 03/03/2016.
//  Copyright © 2016 ZUK. All rights reserved.
//

import UIKit

@objc(HWPSecretGeneratorPlugin) class CDVSecretGeneratorPlugin: CDVPlugin {
    
    var timer = NSTimer()
    var callbackId : String = ""
    
    func update(){
        NSLog("update()")
        
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: "Event from swift!")
        commandDelegate!.sendPluginResult(pluginResult, callbackId: self.callbackId)
    }
    
    func generateSecret(command: CDVInvokedUrlCommand) {
        
        timer = NSTimer.scheduledTimerWithTimeInterval(5, target: self, selector: "update", userInfo: nil, repeats: true)
        
        NSLog("========== generateSecret()!")
        NSLog("========== command.arguments: \(command.arguments)")
        NSLog("========== command.argumentAtIndex(0): \(command.argumentAtIndex(0))")
        NSLog("========== command.callbackId: \(command.callbackId)")
        
        let message = command.arguments[0]
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: "Hello \(message)")
        
        // pluginResult.setKeepCallbackAsBool(true) -> Don't destroy callback
        
        commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
    }
    
    func subscribe(command: CDVInvokedUrlCommand) {
        callbackId = command.callbackId
    }
}
