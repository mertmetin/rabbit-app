import React from 'react';
import { Navigate } from '@/icons';
import { ListItem } from '@ui-kitten/components';

export const PositionFinderButton = ({ submitHandler }) => {
    const NavigateIcon = () =>  <Navigate size={24} />

    return (
        <ListItem
            key={"use-current-location"}
            title={'Use current location'}
            accessoryLeft={NavigateIcon}
            onPress={submitHandler}
        />
    );
}