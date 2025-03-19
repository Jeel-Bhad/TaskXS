import {Image, View ,ScrollView,TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './domainDropdownStyle';
import Dropdown from '../../components/dropdown/Dropdown';
import Button from '../../components/button/Button';
import {DomainScreenNavigationProp, domainDropdownRouteProp} from '../../types/navigationType';
import {Controller, FieldErrors, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {domainListApi, isDomainExistApi} from '../../redux/slices/authSlice';
import {COLORS, customToast, setLocalStorageValue} from '../../utils/helpers';

const logo = require('../../../assets/images/newXsLogo.jpeg');

type PropType = {
  navigation: DomainScreenNavigationProp;
  route:domainDropdownRouteProp;
};

const Domain = ({navigation,route}: PropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm({defaultValues: {domain: ''}});
  const username = route.params.username;
  const [DomainList, setDomainList] = useState<[] | {title: string; value: string;enableAzureSSO:boolean;clientId:string;tenantId:string}[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  useEffect(()=>{
    dispatch(domainListApi({username:username,navigation})).unwrap().then((res)=>{
      setDomainList(prev =>
        res.data?.map((item: {
          domain: any; name: any;enableAzureSSO:any,clientId:any,tenantId:any }) => ({
          title: item.name,
          value: item.domain,
          enableAzureSSO: item.enableAzureSSO,
          clientId:item.clientId,
          tenantId:item.tenantId
        })),
      );
    });
  },[])


  const onSubmit = async () => {   
    const selectedDomainItem = DomainList.find((item) => item.value === selectedDomain);
    if(selectedDomainItem){
      await setLocalStorageValue({field: 'Domain', data:selectedDomainItem.value});
      if(selectedDomainItem.enableAzureSSO === true)
      {
        navigation.navigate('ssoLogin', {username:username,clientId:selectedDomainItem.clientId,tenantId:selectedDomainItem.tenantId})
      }
      else{
        navigation.navigate('login', {DomainUrl:selectedDomainItem.title,username:username})
      }
    }else{
      customToast({type: 'error', text1: "Please select any domain !"});
    }
  };

  const handleChangeDomain = (value:string) => {
    setSelectedDomain(value);
    };
    const onError = (errors: FieldErrors<{domain: string}>) => {
      customToast({type: 'error', text1: errors.domain?.message});
    };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.scrollView}
      contentInsetAdjustmentBehavior="automatic"
       keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={logo} style={styles.imageStyle} resizeMode="contain" />
          <Controller
                name="domain"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    data={DomainList}
                    onChange={handleChangeDomain}
                    value={selectedDomain}
                    placeHolder="Domain"           
                  />
                )}
          />
          <Button domainButton onPress={handleSubmit(onSubmit, onError)}  label="next" />
        </View>
      </View>
    </ScrollView>
  );
};

export default Domain;
