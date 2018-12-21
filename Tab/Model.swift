//
//  Model.swift
//  Tab
//
//  Created by Björn Saja on 20.12.18.
//  Copyright © 2018 W11K. All rights reserved.
//

import CoreData
import RxSwift

class Model {
    var subscription: Disposable?
    static let shared = Model()
    let itemsSubject = BehaviorSubject<[Item]>(value: [])
    
    private init() {
        loadContext()
        subscription = persistentContainer.viewContext.qk_objectsDidChange().subscribe(onNext: { notification in
            self.loadContext()
        })
    }
    
    deinit {
        if (subscription != nil) {
            subscription!.dispose()
        }
    }
    
    func getData() -> Observable<[Item]> {
        return itemsSubject.asObservable()
    }
    
    // MARK: - Core Data stack
    
    private lazy var persistentContainer: NSPersistentContainer = {
        /*
         The persistent container for the application. This implementation
         creates and returns a container, having loaded the store for the
         application to it. This property is optional since there are legitimate
         error conditions that could cause the creation of the store to fail.
         */
        let container = NSPersistentContainer(name: "Tab")
        container.loadPersistentStores(completionHandler: { (storeDescription, error) in
            if let error = error as NSError? {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                
                /*
                 Typical reasons for an error here include:
                 * The parent directory does not exist, cannot be created, or disallows writing.
                 * The persistent store is not accessible, due to permissions or data protection when the device is locked.
                 * The device is out of space.
                 * The store could not be migrated to the current model version.
                 Check the error message to determine what the actual problem was.
                 */
                fatalError("Unresolved error \(error), \(error.userInfo)")
            }
        })
        return container
    }()
    
    // MARK: - Core Data Saving support
    
    func saveContext () {
        let context = persistentContainer.viewContext
        if context.hasChanges {
            do {
                try context.save()
            } catch {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                let nserror = error as NSError
                fatalError("Unresolved error \(nserror), \(nserror.userInfo)")
            }
        }
    }
    
    // MARK: - Core Data Loading support
    
    private func loadContext() {
        let context = persistentContainer.viewContext
        do {
            itemsSubject.onNext(try context.fetch(Item.fetchRequest()))
        } catch {
            print("Fetching Failed")
        }
    }
    
    func addItem(_ title: String) {
        let context = persistentContainer.viewContext
        
        let item = Item(context: context)
        item.id = Int32(Date().timeIntervalSince1970)
        item.title = title
        item.completed = false
        
        saveContext()
    }
    
    func removeItem(_ item: Item) {
        let context = persistentContainer.viewContext
        
        context.delete(item)
        
        saveContext()
    }
    
    func updateItem(_ item: Item, key: String, value: Any) {
        item.setValue(value, forKey: key)
        saveContext()
    }

}
