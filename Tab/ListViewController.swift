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
                return items.filter{
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
            .subscribe(onNext:  { value in
                print("tapped")
            })
            .disposed(by: disposeBag)
    }
}
