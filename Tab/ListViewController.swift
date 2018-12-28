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
import RxDataSources


enum ListType: String {
    case Active
    case All
    case Completed
}

extension Item: IdentifiableType {
    public typealias Identity = Int32
    public var identity: Identity {
        return id
    }
    
    static func ==(lhs: Item, rhs: Item) -> Bool {
        return lhs.title == rhs.title && lhs.completed == rhs.completed
    }
}
struct CustomSectionDataType {
    var uniqueId: Int
    var items: [Item]
}
extension CustomSectionDataType: AnimatableSectionModelType {
    init(original: CustomSectionDataType, items: [Item]) {
        self = original
        self.items = items
    }
    typealias Identity = Int
    var identity: Int {
        return uniqueId
    }
}


class ListViewController: UITableViewController {
    var model: Model = Model.shared
    let disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.tableView.delegate = nil
        self.tableView.dataSource = nil
        
        let listType = ListType(rawValue: self.title!) ?? ListType.All
        
        let dataSource = RxTableViewSectionedAnimatedDataSource<CustomSectionDataType>(
            configureCell: { dataSource, tableView, indexPath, item in
                let cell = tableView.dequeueReusableCell(withIdentifier: "TodoItem", for: indexPath) as! ListViewItem
                cell.setupCell(item)
                return cell
        })
        model.getData()
            .map { (items) -> [Item] in
                return items.filter {
                    (listType == ListType.Active && $0.completed == false) ||
                    (listType == ListType.Completed && $0.completed == true) ||
                    (listType == ListType.All) ? true : false
                }
            }
            .map { (items) -> [CustomSectionDataType] in
                return [CustomSectionDataType(uniqueId: 0, items: items)]
            }
            .bind(to: tableView.rx.items(dataSource: dataSource))
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
        self.tableView.reloadData()
    }
}
