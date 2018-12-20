//
//  FirstViewController.swift
//  Tab
//
//  Created by Björn Saja on 13.12.18.
//  Copyright © 2018 W11K. All rights reserved.
//

import UIKit

enum ListType: String {
    case Active
    case All
    case Completed
}

struct Item {
    var id: Int
    var title: String
    var completed: Bool
}

class ListViewController: UITableViewController {
    var listType: ListType = ListType.All
    var items = [
        Item(id: 1, title: "test1", completed: false),
        Item(id: 2, title: "test2", completed: false),
        Item(id: 3, title: "test3", completed: true),
        Item(id: 4, title: "test4", completed: false),
        Item(id: 5, title: "test5", completed: true)
    ]
    var filteredItems: [Item] {
        return items.filter{
            (listType == ListType.Active && $0.completed == false) ||
            (listType == ListType.Completed && $0.completed == true) ||
            listType == ListType.All ? true : false
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        listType = ListType(rawValue: self.title!) ?? ListType.All
    }
    
    // MARK: - Table view data source
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return filteredItems.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TodoItem", for: indexPath)

        cell.textLabel?.text = filteredItems[indexPath.row].title

        return cell
    }
 
    
    /*
     // Override to support conditional editing of the table view.
     override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
     // Return false if you do not want the specified item to be editable.
     return true
     }
     */
    
    /*
     // Override to support editing the table view.
     override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
     if editingStyle == .delete {
     // Delete the row from the data source
     tableView.deleteRows(at: [indexPath], with: .fade)
     } else if editingStyle == .insert {
     // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
     }
     }
     */
    
    /*
     // MARK: - Navigation
     
     // In a storyboard-based application, you will often want to do a little preparation before navigation
     override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
     // Get the new view controller using segue.destination.
     // Pass the selected object to the new view controller.
     }
     */
    
}
