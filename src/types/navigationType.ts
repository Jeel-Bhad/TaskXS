import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Username: undefined;
  Domain : {username:string} ;
  login: {DomainUrl: string,username:string};
  ssoLogin : {username:string,clientId:string,tenantId:string};
  forgotPassword: {DomainUrl: string,username:string};
  home: undefined;
  changePassword: undefined;
  profile: undefined;
  Notifications:{projectId: number};
  Task:{projectId: number, planningProjectId:number, ticketProjectId:string};
  DashboardChat:{projectId: number};
  Dashboard:{projectId: number};
  Subfolder:{projectId: number , folderId: number};
  Childsubfolder:{projectId: number , folderid:number , subFolderId:number};
  Document:{projectId: number , folderId:number , subfolderId:number , ChildSubFolderId:number}
  Chatuserlist:{projectId: number , folderId:number , subfolderId:number , ChildSubFolderId:number}
  SignalR:{isGroup: boolean , receiverId:number| undefined | null , userName:string , groupId:number | undefined | null, 
    isFrom:string ,projectId: number , folderId:number , subfolderId:number , ChildSubFolderId:number }
};

export type DomainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Username'
>;

export type domainDropdownScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Domain'
>;

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'login'
>;

export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'forgotPassword'
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'home'
>;

export type ChangePasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'changePassword'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'profile'
>;

export type NotificationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

export type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export type SubfolderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Subfolder'
>;

export type ChildsubfolderScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Childsubfolder'
>;

export type DocumentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Document'
>;

export type ChatuserlistScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chatuserlist'
>;

export type SignalRScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignalR'
>;

export type DashboardChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DashboardChat'
>;

export type TaskScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Task'
>;

export type ssoLoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ssoLogin'
>;

//route prop
export type domainDropdownRouteProp = RouteProp<RootStackParamList, 'Domain'>;
export type forgotPasswordeRouteProp = RouteProp<RootStackParamList, 'forgotPassword'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'login'>;
export type ssoLoginScreenRouteProp = RouteProp<RootStackParamList, 'ssoLogin'>;
export type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;
export type SubfolderScreenRouteProp = RouteProp<RootStackParamList, 'Subfolder'>;
export type ChildsubfolderScreenRouteProp = RouteProp<RootStackParamList, 'Childsubfolder'>;
export type DocumentScreenRouteProp = RouteProp<RootStackParamList, 'Document'>;
export type ChatuserlistScreenRouteProp = RouteProp<RootStackParamList, 'Chatuserlist'>;
export type SignalRScreenRouteProp = RouteProp<RootStackParamList, 'SignalR'>;
export type NotificationScreenRouteProp = RouteProp<RootStackParamList, 'Notifications'>;
export type DashboardChatScreenRouteProp = RouteProp<RootStackParamList, 'DashboardChat'>;
export type TaskScreenRouteProp = RouteProp<RootStackParamList, 'Task'>;