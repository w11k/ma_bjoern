//
//  MenuViewController.swift
//  Tab
//
//  Created by Björn Saja on 18.12.18.
//  Copyright © 2018 W11K. All rights reserved.
//


import UIKit
import KYDrawerController

class MenuViewController: UITableViewController {
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let drawerController = navigationController?.parent as? KYDrawerController,
            let navController = drawerController.mainViewController as! UINavigationController?
            else { return }
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        let controller: UIViewController?
        switch indexPath.row {
        case 0:
            controller = storyboard.instantiateViewController(withIdentifier: "Todos")
            break
        case 1:
            controller = storyboard.instantiateViewController(withIdentifier: "Settings")
            break
        case 2:
            controller = storyboard.instantiateViewController(withIdentifier: "About")
            break
        default:
            controller = nil
            break
        }
        if controller == nil {
            return
        }
        navController.setViewControllers([controller!], animated: true)
        drawerController.setDrawerState(.closed, animated: true)
    }
}
