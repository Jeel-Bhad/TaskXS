export type rootStateType = {
  auth: null | authStateType;
  shared: sharedStateType;
  project: null | projectStateType;
  profile: null | profileStateType;
  notification: null | notificationStateType;
  dashboard: null | dashboardStateType;
  document: null | documentStateType;
  chat: null | chatStateType;
  search:null | searchStateType;
};

export type sharedStateType = {
  loading: boolean;
  currentSelectedLanguage:string;
  settingsData: settingResponseDataType;
};

export type authStateType = {
  domainList: null | domainListType;
  isDomainExist: null | isDomainExist;
  loginRes: null | loginResType;
  loginToken: null | string;
  changePasswordData: null | changePasswordDataType;
};

export type projectStateType = {
  projectList: null | projectListType;
};

export type notificationStateType = {
  notificationList: null | notificationListType;
  markAsReadList: null | markAsReadListType;
  notificationListByProject: null | notificationListType;
  unReadNotificationCnt: null | unReadNotificationCntType;
};

export type dashboardStateType = {
  particularProjectList: null | particularProjectListType;
  subfolderList: null | subfolderListType;
  childsubfolderList: null | subfolderListType;
  dashboardChatList: null | dashboardChatListType;
  taskList: null | taskListType;
  planningList: null | planningListType;
  ticketList: null | ticketListType;
}

export type documentStateType = {
  documentList: null | documentListType;
  folderDetail: null | folderDetailListType;
  subfolderDetail: null | subfolderDetailListType;
  openDocument: null | openDocListType;
}

export type chatStateType = {
  chatUserList: null | chatUserListType;
  chatGrp: null | chatGrpListType;
  msgId:null | msgIdListType;
  msgList:null | msgListType;
  updateMessageRead:null | updateMessageReadType;
  updateGrpRead:null | updateGrpReadType;
  sendMsg:null | sendMsgType;
}

export type searchStateType = {
  searchList: null | searchListType;
};
type domainListType = {
  message: string;
  data: {id: number; name: string; domain: string}[];
  success: boolean;
  messageType: number;
};

export type isDomainExist = {
  message: null | string;
  success: boolean;
  data: {
    data: string;
    message: null | string;
    success: boolean;
    messageType: number;
  };
  messageType: number;
};

export type loginResType = {
  message: null | string;
  success: boolean;
  data: {
    id: number;
    token: string;
    email: string;
  };
  messageType: number;
};

type changePasswordDataType = {
  message: null | string;
  success: boolean;
  messageType: number;
  data: {value: boolean};
};

export type searchListType = {
  message: null | string;
  messageType: number;
  success: boolean;
  data: {
    buildings: searchItemType[];
    chilSubFolder: searchItemType[];
    documentType: searchItemType[];
    folder: searchItemType[];
    subFolder: searchItemType[];
    supplier: searchItemType[];
  };
};

export type searchItemType = {
  description: null | string;
  id: number;
  name: null | string;
  selected: boolean;
}

export type projectListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: projectItemType[];
};


export type unReadNotificationCntType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: Number | undefined;
};

export type notificationListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: notificationItemType[];
};

export type markAsReadListType = {
  message: null | string;
  success: boolean;
  data: string;
  messageType: number;
};

export type particularProjectListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: particularProjectItemType;
}

export type subfolderListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: subfolderItemType;
}

export type documentListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: documentItemType[] | [];
};

export type folderDetailListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    id: number;
    isActive: boolean;
    lazyLoader: {};
    name: string;
  };
}

export type subfolderDetailListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    id: number;
    folderId: number;
    documentStorageType: null | string;
    isActive: boolean;
    name: string;
    parentId: null | number;
    parentName: null | string;
    projectTemplateId: number;
    sharepointFolderId:null | number;
  };
}

export type openDocListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    filePath: string ;
  }
}

export type dashboardChatListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    projectId: number;
    folderGroupList: [];
    folderAllDetailList: folderAllDetailListType[];
  };
}

export type taskListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    title: null | string,
    userName: null | string,
    date: null | string,
    projectName: null | string,
    projectAddress: null | string,
    projectCode: null | number,
    userId: null | number,
    lstProjectUSerList: [] | null,
    lstAssignProjectUSerList: [] ,
    projectId: number,
    id: number,
    momId: number,
    bId: number,
    buildingId: null | number,
    projectnr: null | number,
    dueDate: null | string,
    plaats: null | string,
    isScratchMeeting: boolean,
    index: number,
    parentId: number,
    isAllUser: boolean
    lstMOMTopics:lstMOMTopicsTypes[]   
  };
}

export type planningListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    id: number,
    name: null | string,
    activities: null | string,
    type: null | string,
    startDate: null | string,
    endDate: null | string,
    responsible: null | string
  }[],
}

export type ticketListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data : {
    groupId:  null | string,
      _rev:  null | string,
      project:  null | string,
      type:  null | string,
      dateCreated: null | string,
    content: {
      body:  string,
      title:  null | string,
      attachments: null | string[],
      imageUrl: null | string[],
    },
  }[],
}

export type chatUserListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    connectionId: null | number,
    currentMessageDetails: null | string,
    folderId: number,
    groupId: null | number,
    id: number
    messageCount: number,
    participate_1: null | number,
    participate_2: null | number,
    projectId: number,
    subFolderId: number,
    subSubFolderId: null | number
    messageDetails: messageDetailsListType[],
    userList: chatuserListType[]
  }
}

export type chatGrpListType = {
  data: number | null;
  message: null | string;
  success: boolean;
  messageType: Number;
}

export type msgIdListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: {
    folderId: number,
    groupId: null | number,
    id: number,
    lazyLoader: {},
    participate_1: null | number,
    participate_2: null | number,
    projectId: number,
    subFolderId: number,
    subsubFolderId: null | number
    messageDetails:[],
  }
}

export type msgListType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data: messageDetailsItemType[]
}

export type updateMessageReadType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data:{
    value:boolean
  }
}

export type updateGrpReadType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data:{
    value:boolean
  }
}

export type sendMsgType = {
  message: null | string;
  success: boolean;
  messageType: Number;
  data:{
    connectionId: null | number;
    currentMessageDetails: null | string;
    folderId: number
    groupId: null | number;
    id: number;
    messageCount: number;
    participate_1: number;
    participate_2: number;
    projectId: number;
    subFolderId: number;
    subSubFolderId: number;
    userList: null | string;
    messageDetails: messageDetailsItemType[];
  }
}

type messageDetailsItemType = {
  folderId?: number,
  groupId?: null | number,
  id?: number,
  isGroup?: boolean,
  isMessageRead?: boolean,
  isPage?: null | string,
  messageId?: number,
  messageText: string,
  projectId?: number
  readDate?: null | string,
  receiverId: number
  receiverName?: string,
  sendDate: string,
  senderId: number
  senderName?: string,
  subFolderId?: null | number
  subSubFolderId?: null | number
}

type projectItemType = {
  buildingId: number;
  buildingName: null | string;
  clientId: number;
  isMaintenanceFolderAvailable: boolean;
  isSelfCreated: boolean;
  maintenanceFolderId: number;
  openActions: number;
  planningProjectId: null | number;
  planningSourceId: null | number;
  projectTemplateId: number;
  ticketProjectId: null | string;
  ticketSourceId: null | number;
  userRoleId: null | number;
  unReadNotificationCount:number;
  lstDashboard: lstDashboardType[];
};
type lstDashboardType = {
  colorCode: string;
  borderColorCode: string;
  folderId: number;
  folderName: string;
  isAccessRights: boolean;
  textColorCode: string;
  isSubFolderExist: boolean;
  childFolder: [];
};
export type notificationItemType = {
  buildingId: number;
  buildingName: string;
  folderId: number;
  folderName: string;
  subfolderId: number;
  subfolderName: null | string;
  childSubfolderId: number;
  isGroup: boolean;
  groupId: number;
  receiverId: number;
  receiverName: string;
  contactpersoon: string;
  senderId: number;
  senderName: string;
  messageId: number;
  messageText: string;
  isFrom: string;
  sendDate: string;
};

export type lstMOMTopicsTypes = {
  id: number,
  moMId: number,
  parentId: number,
  title: string,
  description: null | string,
  dueDate: string,
  isDeleted: boolean,
  isCarryForword: boolean,
  isAllUser: boolean,
  isCompleted: boolean,
  isUpdateUser: boolean,
  isItemOrNotes: boolean,
  createdDate: string,
  createdBy: number,
  updatedDate: string,
  updatedBy: number,
  lstProjectUSerList: null | [],
  lstgetUserList: [],
  userId: null | number,
  projectId: number,
  allUsers: boolean,
  users: null,
  lstSubject: [],
  status: number,
  lstmomTopicUser: null,
  subItems: number,
  shortOrder: number,
  index: string,
  meetingName: string,
  defaultId: number,
  isDefaultTopic: boolean
}

export type particularProjectItemType = {
  buildingName: string;
  buildingId: number;
  openActions: number;
  isSelfCreated: boolean;
  userRoleId: null | number;
  projectTemplateId: number;
  clientId: number;
  ticketSourceId: number;
  ticketProjectId: string;
  planningSourceId: number;
  planningProjectId: string;
  isMaintenanceFolderAvailable: boolean;
  maintenanceFolderId: number;
  lstDashboard: particularProjectLstDashboardType[];
}

export type subfolderItemType = {
  projectName: string;
  folderName: string;
  projectId: number;
  folderId: number;
  subFolderName: string;
  projectTemplateId: number;
  subFolderId: number;
  childFolderId: number;
  isFolderDocument: boolean;
  buldingID: number;
  lstDashboard: childFolderType[];
}

export type documentItemType = {
  id: number;
  projectId: number;
  folderId: number;
  projectName: string;
  folder: string;
  subFolder: string;
  subSubFolder: string | null;
  issueDate: string | null;
  documentType: string;
  beschikbaar: boolean;
  actueel: boolean;
  email: string | "";
  documentNaam: string;
  documentReferenceCode: string | null;
  documentTypeId: number;
  issuer: string | null;
  contact: string | null;
  topical: string;
  subFolderId: number;
  supplierName: string | null;
  documentDetails: string | null;
  documentVersions: documentVersionsType[] | [];
  topicalUrl: string | "";
  liveTopicalUrl: string | "";
  isExcelFile: boolean;
  iconname: string | null;
  icon: string | null;
  subSubFolderId: number | null;
  webIcon: string | null;
  filename: string | null;
  approverId: number;
  sortName: string;
  expirationDate: string | null;
  liveURL: string | null;
  project:  string | null;
  expireert: number;
  pendingDocuments: string | null;
  fileType: string | null;
  downloadURL: string | null;
  fileMode: string | null;
  oldFileMode: string | null;
  sharepointFolderId: number | null;
  sharePointDocumentWebUrl: string | "";
  documentStorageType: string | null;
}

export type particularProjectLstDashboardType = {
  colorCode: string;
  borderColorCode: string;
  folderId: number;
  folderName: string;
  isAccessRights: boolean;
  textColorCode: string;
  isSubFolderExist: boolean;
  childFolder: childFolderType[];
}

export type childFolderType = {
  colorCode: string,
  borderColorCode: string,
  folderId: number,
  subFolderId: number,
  subFolderName: string,
  isAccessRights: boolean,
  activeDocumentCount: number,
  deActiveDocumentCount: number,
  activeDocumentMaint: number,
  deActiveDocumentMaint: number,
  totalDocumentCount: number,
  documentDetailCount: number,
  allBlankDocument: number,
  textColorCode: string,
  projectTemplateId: number,
  parentId: null | number,
  isChildSubFolderExist: boolean,
  subChildFolder: subChildFolderType[] | [],
}

export type subChildFolderType = {
  colorCode: string,
  borderColorCode: string,
  folderId: number,
  subFolderId: number,
  subFolderName: string,
  isAccessRights: boolean,
  activeDocumentCount: number,
  deActiveDocumentCount: number,
  activeDocumentMaint: number,
  deActiveDocumentMaint: number,
  totalDocumentCount: number,
  documentDetailCount: number,
  allBlankDocument: number,
  textColorCode: string,
  projectTemplateId: number,
  parentId: null | number,
  isChildSubFolderExist: boolean,
  subChildFolder: []
}

export type documentVersionsType = {
  documentVersion: string,
  isExcelFile: boolean,
  liveUrl: string,
  sharePointDocumentWebUrl: string | null,
  url: string
}

export type folderAllDetailListType = {
  folderId	:	number,
  subFolderId	:	number,
  folderName	:	string,
  messageDetailId	:	number,
  messageText	:	string,
  childId	:	number,
  senddate	:	string,
  imageProfile	: string | null,
}

type chatuserListType = {
  isGroup: boolean,
  isGroupMessageRead: boolean,
  messageId: number,
  name: string,
  profileImage: null | string,
  receiverId: number,
  totalUnReadMessage: number,
  userId: number,
}

type messageDetailsListType = { 
  folderId: number,
  groupId: null | number,
  id: number,
  isGroup: false,
  isMessageRead: false,
  isPage: null | string,
  messageId: number,
  messageText: number,
  projectId: number,
  readDate: null | string, 
  receiverId: null | number,
  receiverName: null | string,
  sendDate: string,
  senderId: number,
  senderName: string,
  subFolderId: null | number,
  subSubFolderId: null | number
}

type profileStateType = {
  getProfileData: null | getProfileApiResponseType;
  postProfileData: null | postProfileApiResponseType;
  issuersList: null | issuerListType;
};

type issuerListType = {
  message: null | string;
  messageType: number;
  success: boolean;
  data: issuerItemType[];
};

type issuerItemType = {
  description: null | string;
  id: number;
  name: string;
  selected: boolean;
};

type getProfileApiResponseType = {
  message: null | string;
  messageType: number;
  success: boolean;
  data: userProfile;
};

type postProfileApiResponseType = {
  message: null | string;
  messageType: number;
  success: boolean;
  data: userProfile;
};

export type userProfile = {
  lazyLoader: {};
  id: number;
  bedrijf: null | string;
  address: null | string;
  postcode: null | string;
  plaats: null | string;
  website: null | string;
  kvK: null | string;
  btWnr: null | string;
  contactpersoon: string;
  functie: null | string;
  email: string;
  telefoon: string;
  notifications: null;
  userName: string;
  password: string;
  isActive: boolean;
  userRole: number;
  subscriptionsId: number;
  agentId: number;
  transactionId: null | number;
  languageId: number | string;
  country: null | string;
  supplierId: number | string;
  profilePicture: null | string;
  initial: null | string;
  isNotification: boolean;
  tasksNotification: boolean;
  messagesNotification: boolean;
  approvalsNotification: boolean;
  taskEmailNotification: boolean;
  approveEmailNotification: boolean;
  refreshtoken: string;
  t:any
};

export type settingsResponse = {
  message: null | string;
  messageType: number;
  success: boolean;
  data: null;
};

type settingResponseDataType = {
  brandingViewModel: {
    name: null | string;
    image: null | string;
    description: null | string;
    imageContent: null | string;
    imageFile: null | string;
  };
  appSettingViewModel:
    | null
    | {
        id: number;
        name: string;
        dataType: string;
        value: string;
        section: string;
      }[];
};
