import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex:1
  },
  nameContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding:15,
  },
  textStyleDocName:{
    fontSize:18,
    color:'black',
    fontWeight:'bold',
    flex: 1,
    flexWrap: 'wrap'
  },
  textStyleDocNameWithTopicalUrl:{
    fontSize:18,
    color:'blue',
    fontWeight:'bold',
    flex: 1,
    flexWrap: 'wrap'
  },

  title : {
    fontSize:18,
    color:'black',
    fontWeight:'bold',
    flexWrap: 'wrap'
  },
  textStyleOther:{
    color:'black',
  },
  textStyleOtherWithDoc:{
    color:'blue',
  },
  documentContainer: {
    paddingHorizontal:15,
    padding:20,
    margin:5,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#fff',
  },
  container: {
    justifyContent:'flex-start',
    alignItems: 'flex-start',
  },
  nameIcon: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    gap:4,
  },
  row: {
    flexDirection: 'row',
    width:'100%',
    flex:1,
    justifyContent:'space-between',
    alignItems: 'flex-start',
    paddingHorizontal:15
  },
  commonColumn:{
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:10,
    gap:8,
  },
  imageDocIcon: {
    height:'10%',
    width:'10%',
    padding:18
  },
  availabilityIcon: {
    height:'5%',
    width:'5%',
    padding:10
  },
  previousVersion: {
    flexDirection:'row',
    gap: 5,
    alignItems:'center'
  },
  noDocumentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noDocumentText: {
    fontSize: 16,
  },

   
   

});

export default styles;