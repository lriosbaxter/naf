import React, {useEffect, useState} from 'react';
import { Table, Button, Icon} from "semantic-ui-react";
import './TableSites.scss';
import { map } from "lodash";
import {usePing} from "../../../../hooks/usePing";
import {runPingApi} from "../../../../api/connections";
import {useUser} from "../../../../hooks";


export function TableSites(props) {
    const {sites, updateSite, onDeleteSite, devices} = props
    const {users, getUsers} = useUser();
    useEffect(() => {
        getUsers()
    }, []);


    const getUserbyId = (id) => {
        if (!users || typeof users !== 'object') {
            return null;
        }

        for (const user of users) {
            if (user.id === id) {
                return user.email;
            }
        }

        return null;
    };
    if (sites === null || sites === undefined) {
        return <div>No routers data available</div>;
    }
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Site name</Table.HeaderCell>
                    <Table.HeaderCell>Region</Table.HeaderCell>
                    <Table.HeaderCell>City</Table.HeaderCell>
                    <Table.HeaderCell>Administrator</Table.HeaderCell>
                    <Table.HeaderCell>Devices</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(sites, (site, index) => {
                    const filteredSite = site.administrator !== null ? getUserbyId(site.administrator) : null;
                    return ( // Explicit return for clarity
                        <Table.Row key={index}>
                            <Table.Cell>{site.site_name}</Table.Cell>
                            <Table.Cell>{site.region}</Table.Cell>
                            <Table.Cell>{site.city}</Table.Cell>
                            <Table.Cell>{filteredSite ? filteredSite : 'Administrator not assigned'}</Table.Cell>
                            <Table.Cell>{site.devices}</Table.Cell>
                            <Table.Cell>
                                <Actions site_act={site} updateSite={updateSite} onDeleteSite={onDeleteSite}
                                         devices={devices}/>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}
function Actions(props) {
    const { site_act, updateSite, onDeleteSite, devices } = props;
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [isLoadingPing, setIsLoadingPing] = useState(false);
    const [pingResults, setPingResults] = useState([]);
    const { ping, getPing } = usePing(); // Assuming you have a custom hook for ping
    const [showPingResults, setShowPingResults] = useState(false); // State to track whether to show ping results

    const handlePingClick = async (site_id) => {
        try {
            setIsLoadingPing(true);
            const devicesWithMatchingId = devices.filter(device => device.site === site_id);
            setFilteredDevices(devicesWithMatchingId);

            const pingPromises = devicesWithMatchingId.map(device => runPingApi(device.ip_address));
            const results = await Promise.all(pingPromises);
            console.log(results)
            setPingResults(results)
            setShowPingResults(true); // Show ping results after the button is clicked
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoadingPing(false);
        }
    };

    return (
        <>
            <Table.Cell textAlign="right">
                <Button icon loading={isLoadingPing} onClick={() => handlePingClick(site_act.id)}>
                    <Icon name="play" />
                </Button>
                <Button icon onClick={() => updateSite(site_act)}>
                    <Icon name="pencil" />
                </Button>
                <Button icon negative onClick={() => onDeleteSite(site_act)}>
                    <Icon name="close" />
                </Button>
            </Table.Cell>
            {showPingResults && (
                <Table.Row>
                    {filteredDevices.map((device, index) => (
                        <Table.Cell key={device.id} colSpan={8}>
                            {device.hostname}: {pingResults[index].ping_status === "not_completed" ? "Unreachable" : "Reachable"}
                        </Table.Cell>
                    ))}
                </Table.Row>
            )}
        </>
    );
}