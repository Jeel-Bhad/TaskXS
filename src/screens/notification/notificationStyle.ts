import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    padding: 8,
    paddingHorizontal: 40,
  },
  headingStyle: {
    color: '#000',
    fontWeight: '500',
  },

  column1: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    width: '50%',
  },
  column2: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-end',
    width: '50%',
  },
  notificationContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  singleNotiContainer: {
    margin: 5,
    borderRadius: 5,
    elevation: 4,
    backgroundColor: '#fff',
  },
  row2: {
    flexDirection: 'row',
    padding: 25,
    paddingHorizontal: 35,
  },
  msgTextStyle: {
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    marginVertical: -8,
  },
  senderName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  notcol: {
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'flex-start',
    width: '80%',
  },
  notcol2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '20%',
  },
});
export default styles;
