import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {setLocalStorageTypes} from '../types/payloadType';

export const customToast = ({
  type,
  text1,
}: {
  type: 'error' | 'success';
  text1: string | undefined;
}) => {
  Toast.show({
    type,
    text1,
  });
};

export const setLocalStorageValue = async (args: setLocalStorageTypes) => {
  const {field, data} = args;
  try {
    await AsyncStorage.setItem(field, data);
  } catch (error) {
    console.log(error);
  }
};

export const getLocalStorageValue = async (field: any) => {
  try {
    const data = await AsyncStorage.getItem(field);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBorder = (str: string) => {
  const strArray = str?.replaceAll('.0px', '')?.split('#');

  const subStr = strArray[0]?.split(' ');

  const width = Number(subStr[0]?.replaceAll('.px', ''));
  const type = subStr[1];
  const color = `#${strArray[1]}`;
  return {width, type, color};
};

export const formatYourDate = (dateString:any) => {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Get the individual components of the date
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  // Format the date in the desired format
  const formattedDate = `${day}/${month}/${year} ${hours % 12 || 12}:${minutes}:${seconds} ${meridiem}`;

  return {formattedDate};
};

export const formatDateWOTime = (dateString:any) => {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Get the individual components of the date
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();
 
  // Format the date in the desired format
  const formattedDate = `${day}-${month}-${year}`;

  return {formattedDate};
};



export const languageList = [
  {title: 'English', value: 'en'},
  {title: 'French', value: 'fr'},
  {title: 'German', value: 'de'},
  {title: 'Spanish', value: 'es'},
  {title: 'Dutch', value: 'nl'},
];

//for dynamic color settings
export const COLORS = {
  primaryColor: ''
}

//for dynamic color settings
export const LOGO = {
  dynamicLogo: ''
}