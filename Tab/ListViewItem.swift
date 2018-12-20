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
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var completedCheckbox: BEMCheckBox!
    
    override func didMoveToSuperview() {
        super.didMoveToSuperview()
        if superview != nil {
            completedCheckbox.onAnimationType = .fill;
            completedCheckbox.offAnimationType = .fill;
            
            
            
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
