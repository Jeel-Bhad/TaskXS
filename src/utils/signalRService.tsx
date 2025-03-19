import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";
import { getLocalStorageValue } from './helpers';
import { BehaviorSubject } from 'rxjs';
export default class SignalrService {
  public  connectionHub: signalR.HubConnection;
  public onlineUserList: BehaviorSubject<any[]>; 

  constructor() {
    this.connectionHub = new  signalR.HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl('https://mcdtestapi.ifour-consultancy.net/chatHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: this.getToken
      }).build();
      this.onlineUserList = new BehaviorSubject<any[]>([]);
  }
 
  getToken = async (): Promise<string> => {
    try {
      const token = await getLocalStorageValue('token');
      return token || ''; 
    } catch (error) {
      console.error('Error fetching token:', error);
      return '';
    }
  };
 
  startConnection = async () => {
    try {
      await this.connectionHub.start();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

  public connectToHub = (userId: any, groupId: any) => {
    this.connectionHub.invoke("OnConnect", userId, groupId)
      .then((userList) => {
        this.onlineUserList.next(userList) ;
        console.log(JSON.stringify(userList)+"::FromService");
      })
      .catch(err => {
        console.error(err);
      });
  };

}
