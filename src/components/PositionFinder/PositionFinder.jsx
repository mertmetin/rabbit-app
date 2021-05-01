import React, { useState } from 'react';
import { usePosition } from '@/hooks/usePosition';
import { PositionFinderButton } from './PositionFinderButton';

export const PositionFinder = ({ onPositionFound }) => {
    const { getCurrentPosition } = usePosition();

    const submitHandler = async () => {
        const position =  await getCurrentPosition();

        if (position.coords)
            onPositionFound(position);
    };

    return <PositionFinderButton submitHandler={submitHandler} />
}