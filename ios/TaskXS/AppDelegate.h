#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <RNAppAuthAuthorizationFlowManager.h>
@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate,RNAppAuthAuthorizationFlowManager>

@property (nonatomic, strong) NSDictionary *initialProps;
@property (nonatomic, strong) NSString *moduleName;
@property (nonatomic, weak) id<RNAppAuthAuthorizationFlowManagerDelegate> authorizationFlowManagerDelegate;

@end
