import React from 'react';
import { ADDRESS_HOME, ADDRESS_WORK, ADDRESS_OTHER} from '@/constants';
import { Business as BusinessIcon, Home as HomeIcon, Trail as TrailIcon } from '@/icons'; 

export const getAddressIconByType = (addressType) => {
    let icon = null;

    if (addressType === ADDRESS_HOME)
        icon = <HomeIcon size={20} />
    else if (addressType === ADDRESS_WORK)
        icon = <BusinessIcon size={20} />
    else if (addressType === ADDRESS_OTHER)
        icon = <TrailIcon size={20} />

    return icon;
}