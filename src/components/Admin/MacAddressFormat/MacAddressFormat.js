import React from 'react';

export function MacAddressFormat(props) {
    const { data } = props;
    console.log(data)
    return (
        <div>
            <h4>
                Hostname: {data.hostname}
            </h4>
            <h4>
                Mac Address: {data.mac_address}
            </h4>
            <h4>
                Interface: {data.interface}
            </h4>
            <h4>
                Vlan: {data.vlan}
            </h4>
        </div>
    );
}

