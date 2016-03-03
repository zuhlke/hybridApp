//
//  SecondViewController.swift
//  iOSApp
//
//  Created by Daniel Gartmann on 02/03/2016.
//  Copyright © 2016 ZUK. All rights reserved.
//

import UIKit

class SecondViewController: CDVViewController {

    override func viewDidLoad() {
       super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
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
            self.view.bounds.height-40)
    }


}