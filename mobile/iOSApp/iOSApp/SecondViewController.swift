//
//  SecondViewController.swift
//  iOSApp
//
//  Created by Daniel Gartmann on 02/03/2016.
//  Copyright © 2016 ZUK. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController {

    override func viewDidLoad() {
       super.viewDidLoad()

        let viewController = CDVViewController()
        viewController.view.frame = CGRectMake(0, 40, 320, 450);
        self.view.addSubview(viewController.view)
        
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}