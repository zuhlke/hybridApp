//
//  SecondViewController.swift
//  iOSApp
//
//  Created by Daniel Gartmann on 02/03/2016.
//  Copyright © 2016 ZUK. All rights reserved.
//

import UIKit

class SecondViewController: CDVViewController, UITextFieldDelegate {
    
    @IBOutlet weak var secondViewTextField: UITextField!

    override func viewDidLoad() {
       super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let secretGeneratorPlugin = self.pluginObjects.objectForKey("HWPSecretGeneratorPlugin") as! CDVSecretGeneratorPlugin
        secondViewTextField.delegate = self
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(true);
        self.webView!.frame = CGRectMake(
            self.view.bounds.origin.x,
            self.view.bounds.origin.y+40,
            self.view.bounds.width,
            self.view.bounds.height-120)
        self.view.backgroundColor = UIColor.blueColor()
    }
    
    func textFieldShouldReturn(textField: UITextField) -> Bool {
        secondViewTextField.resignFirstResponder()
        return true
    }
}