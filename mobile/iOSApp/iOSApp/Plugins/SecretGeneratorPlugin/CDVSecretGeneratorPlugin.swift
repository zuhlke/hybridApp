//
//  SecretGeneratorPlugin.swift
//  iOSApp
//
//  Created by Philippe Morier on 03/03/2016.
//  Copyright © 2016 ZUK. All rights reserved.
//

import UIKit

@objc(HWPSecretGeneratorPlugin) class CDVSecretGeneratorPlugin: CDVPlugin {
    func generateSecret(command: CDVInvokedUrlCommand) {
        
        NSLog("========== generateSecret()!")
        NSLog("========== command.arguments: \(command.arguments)")
        NSLog("========== command.argumentAtIndex(0): \(command.argumentAtIndex(0))")
        let message = command.arguments[0]
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAsString: "Hello \(message)")
        
        commandDelegate!.sendPluginResult(pluginResult, callbackId:command.callbackId)
    }
}
