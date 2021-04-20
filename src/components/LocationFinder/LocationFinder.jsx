import React from 'react';

import { usePosition } from '@/hooks/usePosition';
import { LocationFinderButton } from './LocationFinderButton';

export const LocationFinder = ({ setPosition }) => {
    const { getCurrentPosition } = usePosition({ setPosition });
    const submitHandler = () => getCurrentPosition();

    return <LocationFinderButton submitHandler={submitHandler} />
}