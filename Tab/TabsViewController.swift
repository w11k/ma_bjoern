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
    var model: Model = Model.shared
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    @IBAction func menuDidPress(_ sender: UIBarButtonItem) {
        if let drawerController = navigationController?.parent as? KYDrawerController {
            drawerController.setDrawerState(.opened, animated: true)
        }
    }
    
    @IBAction func addDidPress(_ sender: UIBarButtonItem) {
        let alertController = UIAlertController(title: "Enter details?", message: "Enter your name and email", preferredStyle: .alert)
        let confirmAction = UIAlertAction(title: "Ok", style: .default) { (_) in
            let title = alertController.textFields?[0].text ?? ""
            if (!title.isEmpty) {
                self.model.addItem(title)
            }
            
        }
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: nil)
        alertController.addAction(confirmAction)
        alertController.addAction(cancelAction)
        alertController.addTextField { (textField) in
            textField.placeholder = "Title"
        }
        self.present(alertController, animated: true, completion: nil)
    }
}
