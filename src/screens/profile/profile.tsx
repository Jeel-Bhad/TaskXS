import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import styles from './profileStyle';
import * as ImagePicker from 'react-native-image-picker';
import {Avatar} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faCameraAlt,
  faCancel,
  faImages,
} from '@fortawesome/free-solid-svg-icons';
import {Controller, FieldErrors, useForm} from 'react-hook-form';
import Input from '../../components/textInput/Input';
import Switch from '../../components/switch/Switch';
import Button from '../../components/button/Button';
import {updateProfilePayload} from '../../types/payloadType';
import Dropdown from '../../components/dropdown/Dropdown';
import {COLORS, LOGO, customToast, getLocalStorageValue, languageList} from '../../utils/helpers';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {rootStateType, userProfile} from '../../types/reduxStateType';
import {
  getIssuerList,
  getUserProfile,
  postUserProfile,
} from '../../redux/slices/profileSlice';
import {useActionSheet} from '@expo/react-native-action-sheet';
import { useTranslation } from 'react-i18next';

const logo = require('../../../assets/images/TaskXS_Logo.png');
const avatar = require('../../../assets/images/avatar.jpg');
import i18n from '../../locales/i18n';
import { setCurrentSelectedLanguage } from '../../redux/slices/sharedSlice';

const Profile = () => {
  const {showActionSheetWithOptions} = useActionSheet();
  const [image, setImage] = useState<null | string>(null);
  const [issuersList, setIssuersList] = useState<
    [] | {title: string; value: string}[]
  >([]);
  const isFocused = useIsFocused();
  const {t} =useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const dispatch = useDispatch<AppDispatch>();
  const getProfileData = useSelector(
    (state: rootStateType) => state.profile?.getProfileData?.data,
  );
  const getIssuerListData = useSelector(
    (state: rootStateType) => state.profile?.issuersList?.data,
  );
  const dynamicLogoUrl = useSelector(
    (state: rootStateType) =>
      state?.shared?.settingsData?.brandingViewModel?.imageFile,
  );

  const form = useForm<userProfile>({
    defaultValues: {
      supplierId: '',
      contactpersoon: '',
      functie: '',
      email: 'dc',
      telefoon: '',
      languageId: '',
      isNotification: false,
      tasksNotification: false,
      messagesNotification: false,
      approvalsNotification: false,
    },
  });
  const {control, handleSubmit, reset} = form;

  const onSubmit = (data: userProfile) => {
    console.log(data);
    const formData = {...data, profilePicture: image,t};
    dispatch(postUserProfile(formData));
  };

  const onError = (errors: FieldErrors<updateProfilePayload>) => {
    console.log(errors);
    customToast({
      type: 'error',
      text1: (errors.contactpersoon || errors.email || errors.telefoon)?.message,
    });
  };

  useMemo(async () => {
    if (!isFocused) {
      reset();
      setImage(null);
      setIssuersList([]);
    } else {
      const id = await getLocalStorageValue('id');
      if (id && parseInt(id) !== getProfileData?.id) {
        dispatch(getUserProfile(id));
        dispatch(getIssuerList());
      }
    }
    if (getProfileData) {
      reset(getProfileData);
      setImage(getProfileData.profilePicture);
      getIssuerListData &&
        setIssuersList(prev =>
          getIssuerListData?.map(item => ({
            title: item.name,
            value: String(item.id),
          })),
        );
    }
  }, [isFocused, getProfileData]);

  const selectFile = () => {
    const options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchCamera(
      options,
      (response: ImagePicker.ImagePickerResponse) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          let imageUri = response.assets?.[0]?.base64;
          imageUri && setImage(() => imageUri ?? '');
        }
      },
    );
  };

  const openImagePicker = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(
      options,
      (response: ImagePicker.ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          let imageUri = response.assets?.[0]?.base64;
          imageUri && setImage(imageUri ?? '');
        }
      },
    );
  };

  const onPress = () => {
    const options = ['Take Photo', 'Choose from Gallary', 'Cancel'];
    const cancelButtonIndex = 2;
    const icons = [
      <FontAwesomeIcon icon={faCameraAlt} size={24} />,
      <FontAwesomeIcon icon={faImages} size={24} />,
      <FontAwesomeIcon icon={faCancel} size={24} />,
    ];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        icons,
      },
      (selectedIndex: number | undefined) => {
        switch (selectedIndex) {
          case 1:
            openImagePicker();
            break;

          case 0:
            selectFile();
            break;

          case cancelButtonIndex:
        }
      },
    );
  };

  const handleChangeLanguage = (value:string) => {
    setSelectedLanguage(value);
    dispatch(setCurrentSelectedLanguage(value)); 
    i18n.changeLanguage(value); // Change the language using i18n
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Image
            source={
              LOGO.dynamicLogo
                ? {uri: `data:image/png;base64,${LOGO.dynamicLogo}`}
                : logo
            }
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={110}
              source={image ? {uri: `data:image/png;base64,${image}`} : avatar}
            />
            <Avatar.Icon
              size={40}
              icon={() => (
                <TouchableOpacity onPress={() => onPress()}>
                  <FontAwesomeIcon icon={faCamera} size={26} color={COLORS.primaryColor} />
                </TouchableOpacity>
              )}
              style={styles.cameraIcon}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Controller
            name="supplierId"
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown
                onChange={onChange}
                value={String(value)}
                data={issuersList}
                placeHolder={t('supplier')}
                isFlat
              />
            )}
          />
          <Controller
            name="contactpersoon"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                isFlat
                onChange={onChange}
                value={value}
                placeHolder={t('contactPerson')}
                textColor='black'
              />
            )}
            rules={{
              required: {
                value: true,
                message: t('message.person'),
              },
            }}
          />
          <Controller
            name="functie"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                isFlat
                onChange={onChange}
                value={value ?? ''}
                placeHolder={t('function')}
                notRequired
                textColor='black'
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                isFlat
                onChange={onChange}
                value={value}
                placeHolder={t('email')}
                readOnlyInput={true}
                textColor='grey'
              />
            )}
            rules={{
              required: {
                value: true,
                message: t('message.email'),
              },
            }}
          />
          <Controller
            name="telefoon"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input
                isFlat
                onChange={onChange}
                value={value}
                placeHolder={t('phoneNumber')}
                isNumericKeyboard
                textColor='black'
              />
            )}
            rules={{
              required: {
                value: true,
                message: t('message.phone'),
              },
            }}
          />
          <Controller
            name="languageId"
            control={control}
            render={({field: {onChange, value}}) => (
              <Dropdown
                onChange={handleChangeLanguage}
                value={selectedLanguage}
                data={languageList}
                placeHolder={t('lang')}
                isFlat
              />
            )}
          />

          <View style={styles.notificationContainer}>
            <Text style={styles.notificationHeading}>{t('notification')}</Text>
            <Controller
              name="isNotification"
              control={control}
              render={({field: {onChange, value}}) => (
                <Switch value={value} onChange={onChange} label={t('chat_noti')} />
              )}
            />
            <Controller
              name="tasksNotification"
              control={control}
              render={({field: {onChange, value}}) => (
                <Switch value={value} onChange={onChange} label={t('tasks')} />
              )}
            />
            <Controller
              name="messagesNotification"
              control={control}
              render={({field: {onChange, value}}) => (
                <Switch value={value} onChange={onChange} label={t('messages')} />
              )}
            />
            <Controller
              name="approvalsNotification"
              control={control}
              render={({field: {onChange, value}}) => (
                <Switch value={value} onChange={onChange} label={t('approvals')} />
              )}
            />
          </View>
          <Button
            onPress={handleSubmit(onSubmit, onError)}
            label={t('update')}
            isFlat
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
