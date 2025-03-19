import {StyleSheet} from 'react-native';
import { COLORS } from '../../utils/helpers';

const styles = StyleSheet.create({

  taskContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#fff',
    padding:10,
    margin: 15,
  },
  taskView: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 10,
    borderBottomWidth : 0.5,
    borderBottomColor :'gray',
    gap:20,
  },
  column1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '12%',
  },
  column2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '48%',
  },
  column3: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '27%',
  },
  meetingName: {
    fontWeight:'bold',
    color:'black'
  },
  TaskNotFound :{
    color:'black',
  },
  taskNotFoundView: {
    margin:'5%'
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.primaryColor,
  },  
  tab: {
    padding: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryColor,
  },  
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
  },
  plannigView :{
    padding: 8,
    paddingHorizontal: 10,
    borderBottomWidth : 0.5,
    borderBottomColor :'gray',
    gap:5
  },
  planningContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#fff',
    padding:10,
    margin: 15,
    flex:1,
    marginBottom:'20%'
  },
  ticketView :{
    padding: 8,
    borderBottomWidth : 0.5,
    borderBottomColor :'gray',
    flexDirection: 'row',
    gap:20,
  },
  columnTicket: {
    justifyContent: 'flex-start',
    width: '60%',
  },
  columnTicket2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '40%',
    gap:20,
    paddingVertical:18,
  },
  imageStyle: {
    height: 50,
    width: 50,
  },
  modelStyle: {
    justifyContent: 'center',
    alignItems : 'center'
  },
  modalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
export default styles;
