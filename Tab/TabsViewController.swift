//
//  MainViewController.swift
//  Tab
//
//  Created by Björn Saja on 18.12.18.
//  Copyright © 2018 W11K. All rights reserved.
//

import UIKit
import KYDrawerController

class TabsViewController: UITabBarController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func openDrawer(_ sender: UIBarButtonItem) {
        if let drawerController = navigationController?.parent as? KYDrawerController {
            drawerController.setDrawerState(.opened, animated: true)
        }
    }
}
