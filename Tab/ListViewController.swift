//
//  FirstViewController.swift
//  Tab
//
//  Created by Björn Saja on 13.12.18.
//  Copyright © 2018 W11K. All rights reserved.
//

import UIKit
import BEMCheckBox
import RxSwift
import RxCocoa

enum ListType: String {
    case Active
    case All
    case Completed
}

class ListViewController: UITableViewController {
    var listType: ListType = ListType.All
    var model: Model = Model.shared
    let disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.tableView.delegate = nil
        self.tableView.dataSource = nil
        
        listType = ListType(rawValue: self.title!) ?? ListType.All
        
        model.getData()
            .map({ (items) -> [Item] in
                return items.filter {
                    (self.listType == ListType.Active && $0.completed == false) ||
                    (self.listType == ListType.Completed && $0.completed == true) ||
                    (self.listType == ListType.All) ? true : false
                }
            })
            .delay(0.5, scheduler: MainScheduler.instance)
            .bind(to: tableView.rx.items(cellIdentifier: "TodoItem")) {
                (index, item: Item, cell: ListViewItem) in
                cell.setupCell(item)
            }
            .disposed(by: disposeBag)
        
        tableView.rx
            .modelSelected(Item.self)
            .subscribe(onNext: self.openSheet)
            .disposed(by: disposeBag)
    }
    
    func openSheet(_ item: Item) {
        let alertController = UIAlertController(title: nil, message: nil, preferredStyle: .actionSheet)
        
        let defaultAction = UIAlertAction(title: "Edit", style: .default, handler: { (alert: UIAlertAction!) -> Void in
            self.openDialog(item)
        })
        
        let deleteAction = UIAlertAction(title: "Delete", style: .destructive, handler: { (alert: UIAlertAction!) -> Void in
            self.model.removeItem(item)
            self.removeSelection()
        })
        
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel, handler: { (alert: UIAlertAction!) -> Void in
            self.removeSelection()
        })
        
        alertController.addAction(defaultAction)
        alertController.addAction(deleteAction)
        alertController.addAction(cancelAction)
        
        self.present(alertController, animated: true, completion: nil)
    }
    
    func openDialog(_ item: Item) {
        let alertController = UIAlertController(title: "Edit Item", message: nil, preferredStyle: .alert)
        let confirmAction = UIAlertAction(title: "Ok", style: .default) { (_) in
            let title = alertController.textFields?[0].text ?? ""
            if (!title.isEmpty) {
                self.model.updateItem(item, key: "title", value: title)
            }
            self.removeSelection()
            
        }
        let cancelAction = UIAlertAction(title: "Cancel", style: .cancel) { (_) in
            self.removeSelection()
        }
        alertController.addAction(confirmAction)
        alertController.addAction(cancelAction)
        alertController.addTextField { (textField) in
            textField.placeholder = "Title"
            textField.text = item.title
        }
        self.present(alertController, animated: true)
    }
    
    func removeSelection() {
        if let index = self.tableView.indexPathForSelectedRow{
            self.tableView.deselectRow(at: index, animated: true)
        }
    }
}
