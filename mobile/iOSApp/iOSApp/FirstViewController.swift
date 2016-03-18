//
//  FirstViewController.swift
//  iOSApp
//
//  Created by Daniel Gartmann on 02/03/2016.
//  Copyright © 2016 ZUK. All rights reserved.
//

import UIKit

class FirstViewController: UIViewController, UITextFieldDelegate {
    @IBOutlet weak var mainTextField: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        mainTextField.delegate = self
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func textFieldShouldReturn(textField: UITextField) -> Bool {
        mainTextField.resignFirstResponder()
        return true
    }
}

