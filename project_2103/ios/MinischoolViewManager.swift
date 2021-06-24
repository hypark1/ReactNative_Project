
import Foundation

@objc(MinischoolViewManager)
class MinischoolViewManager: RCTViewManager {
  override func view() -> UIView! {
    return MinischoolView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
