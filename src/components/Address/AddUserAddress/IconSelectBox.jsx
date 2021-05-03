import React from 'react';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { addressIcons, getAddressIconIndexByType } from '@/utils/address';

export const IconSelectBox = ({ addressType, onSelect, ...props }) => {
    const  index = getAddressIconIndexByType(addressType);
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(index));

    const icons = Object.values(addressIcons);
    const selectHandler = (index) => {
        setSelectedIndex(index);
        onSelect(icons[index.row]);
    };

    return (
        <Select
            {...props}
            key={1}
            value={icons[selectedIndex.row]}
            selectedIndex={selectedIndex}
            onSelect={selectHandler}>
            {icons.map((icon) => (
                <SelectItem title={icon} />
            ))}
        </Select>
    );
};