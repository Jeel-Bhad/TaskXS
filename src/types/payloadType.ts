import {
  DomainScreenNavigationProp,
  LoginScreenNavigationProp,
  domainDropdownScreenNavigationProp,
} from './navigationType';

export type isDomainExistPayload = {
  domain: string;
  navigation: DomainScreenNavigationProp;
  username:string;
};

export type domainListPayload = {
  username:string;
  navigation: DomainScreenNavigationProp;
};

export type settingsPayload = {
  domain: string | undefined|null;
}
export type loginPayload = {
  formData: {
    domainUrl: string;
    deviceId: null | string | undefined;
    email: string;
    isAgent: boolean;
    isIOS: boolean;
    isMobile: boolean;
    password: string;
  };
  t:any;
};
export type ssoLoginPayload = {
  isIOS:boolean;
  isMobile:boolean;
  domainUrl:string;
  isAgent:boolean;
  deviceId: null | string | undefined;
  requestBody: string;
};

export type checkUsernameExistPayload = {username: string};

export type forgotPasswordPayload = {email: string; id: number,domainName:string,
companyName: string,
companyLogo: string};

export type GetCustomerLogoPayload = {domain: string};

export type getCompanyLogoInPngFormatePayload = {
  domainName : string,
  domainGroupId : number
}
export type setLocalStorageTypes = {
  field: any;
  data: any;
};

export type changePasswordPayload = {
  userId: number;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type updateProfilePayload = {
  supplierId: string;
  contactpersoon: string;
  functie: string;
  email: string;
  telefoon: string;
  languageId: string;
  isNotification: boolean;
  tasksNotification: boolean;
  messagesNotification: boolean;
  approvalsNotification: boolean;
};

export type markAllAsReadApiPayload = {
  markAsReadArray: {
    groupId: number;
    isGroup: boolean;
    messageId: number;
  }[];
};

export type particularProjectPayload = {
  projectId: number;
};

export type subfolderPayload = {
  projectId: number;
  folderId: number;
};

export type childsubfolderPayload = {
  projectId: number;
  folderid: number;
  subFolderId: number;
};

export type documemtListPayload = {
  projectId: number;
  folderId: number;
  subfolderId: number;
  ChildSubFolderId: number;
}

export type folderDetailPayload = {
  id:number;
}

export type subfolderDetailPayload = {
  id:number;
}

export type openDocumentPayload = {
  path:string;
}

export type notificationPayload = {
  projectId: number;
};

export type dashboardChatPayload = {
  projectId: number;
};

export type taskListPayload = {
  projectId: number;
};

export type planningListPayload = {
  planningProjectId: number;
};

export type ticketListPayload = {
  ticketProjectId: string;
};

export type chatUserListPayload = {
  projectId: number;
  folderId: number;
  subFolderId: number;
  subsubFolderId: number;
}

export type chatGrpPayload = {
  chatGrp: {
    projectId: number;
    userId: number[] | undefined;
  };
}

export type getMsgByIdPayload = {
  payloadGrp: {
    folderId: number;
    groupId: number;
    projectId: number;
    receiverId: number | null |undefined;
    subFolderId: number;
    subSubFolderId: number;
  }
}

export type getDetailByMsgIdPayload = {
  messageId: number | undefined;
}

export type updateMessageReadPayload = {
  messageDetailId: number | undefined;
  userId:number;
}

export type UpdateGroupMessageReadPayload = {
  messageId: number | undefined;
  userId:number;
}

export type sendMsgPayload = {
  payloadGrp: {
    folderId: number;
    groupId: number | undefined | null;
    id: number;
    participate_1: number | null;
    participate_2: number | null | undefined;
    projectId: number;
    subFolderId: number;
    subSubFolderId: number;
    messageDetails: {
      folderId: number;
      groupId: number | undefined | null;
      isFrom: string;
      isGroup: boolean;
      isMessageRead: boolean;
      isPage: string;
      messageId: number | null ;
      messageText: string | undefined;
      projectId: number;
      receiverId: number | null |undefined;
      sendDate: string;
      senderId: number | undefined | null;
      subFolderId: number;
      subSubFolderId: number;
    }[];
  }
}