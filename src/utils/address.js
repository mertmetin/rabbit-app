import React from 'react';
import { ADDRESS_HOME, ADDRESS_WORK, ADDRESS_OTHER} from '@/constants';
import { Business as BusinessIcon, Home as HomeIcon, Trail as TrailIcon } from '@/icons'; 

export const addressIcons = {
    [ADDRESS_HOME]: <HomeIcon key={ADDRESS_HOME} size={20} />,
    [ADDRESS_WORK]: <BusinessIcon key={ADDRESS_WORK} size={20} />,
    [ADDRESS_OTHER]: <TrailIcon key={ADDRESS_OTHER} size={20} />, 
};

export const getAddressIconByType = (addressType) => addressIcons[addressType];
export const getAddressIconIndexByType = (addressType) => Object.keys(addressIcons).indexOf(addressType);