//
//  ListViewItem.swift
//  Tab
//
//  Created by Björn Saja on 20.12.18.
//  Copyright © 2018 W11K. All rights reserved.
//

import UIKit
import BEMCheckBox

class ListViewItem: UITableViewCell {
    var model: Model = Model.shared
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var completedCheckbox: BEMCheckBox!
    var item: Item!
    
    func setupCell(_ item: Item) {
        self.item = item
        titleLabel.text = item.title
        completedCheckbox.on = item.completed
    }
    
    @IBAction func didCheckboxChange(_ sender: BEMCheckBox) {
        DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(500)) {
            self.model.updateItem(self.item, key: "completed", value: sender.on)
        }
    }
    
}
