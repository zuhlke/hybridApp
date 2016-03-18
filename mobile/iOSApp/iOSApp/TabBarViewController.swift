//
//  TabBarViewController.swift
//  iOSApp
//
//  Created by Philippe Morier on 15/03/2016.
//  Copyright © 2016 ZUK. All rights reserved.
//

import UIKit

class TabBarViewController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
//        self.tabBar.items![0].accessibilityIdentifier = "FirstAccessibilityId"
//        self.tabBar.items![0].accessibilityLabel = "FirstAccessibilityId"
//        self.tabBar.items![1].accessibilityIdentifier = "SecondAccessibilityId"
//        
        print(self.tabBar.items![0].accessibilityIdentifier)
        print(self.tabBar.items![1].accessibilityIdentifier)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}
