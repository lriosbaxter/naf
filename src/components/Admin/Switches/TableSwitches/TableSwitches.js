import React, {useEffect, useState} from 'react';
import {Table, Button, Icon} from "semantic-ui-react";
import './TableSwitches.scss';
import {runPingApi, sshConnectDeviceApi} from "../../../../api/connections";
import {useSite} from "../../../../hooks";

export function TableSwitches(props) {
    const { switches, updateSwitch, onDeleteSwitch, sendCommand, configFromFile } = props
    const { sites, getSites } = useSite();
    useEffect(() => {
        getSites()
    }, []);
    const getSiteById = (id) => {
        if (!sites || typeof sites !== 'object') {
            return null;
        }

        for (const site of sites) {
            if (site.id === id) {
                return site.site_name;
            }
        }

        return null;
    };
    if (switches === null || switches === undefined) {
        return <div>No switches data available</div>;
    }
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Hostname</Table.HeaderCell>
                    <Table.HeaderCell>Ip Address</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>SSH</Table.HeaderCell>
                    <Table.HeaderCell>VTP Role</Table.HeaderCell>
                    <Table.HeaderCell>VTP Domain Name</Table.HeaderCell>
                    <Table.HeaderCell>Site</Table.HeaderCell>
                    <Table.HeaderCell>Edit/Eliminate/Ping/SSH/Commands</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {switches.map((nd_switch, index) => {
                    const filteredSite = getSiteById(nd_switch.site); // Fetch site based on nd_switch.site
                    return (
                        <Table.Row key={index}>
                            <Table.Cell>{nd_switch.hostname}</Table.Cell>
                            <Table.Cell>{nd_switch.ip_address}</Table.Cell>
                            <Table.Cell>{nd_switch.device_type}</Table.Cell>
                            <Table.Cell>{nd_switch.domain_ssh}</Table.Cell>
                            <Table.Cell>{nd_switch.vtp_role}</Table.Cell>
                            <Table.Cell>{nd_switch.vtp_domain_name}</Table.Cell>
                            <Table.Cell>{filteredSite ? filteredSite : 'Site not found'}</Table.Cell>
                            <Table.Cell>
                                <Actions netd_switch={nd_switch} updateSwitch={updateSwitch} onDeleteSwitch={onDeleteSwitch} sendCommand={sendCommand} configFromFile={configFromFile}/>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}

function Actions(props) {
    const { netd_switch, updateSwitch, onDeleteSwitch, sendCommand, configFromFile } = props
    const [isLoadingPing, seIsLoadingPing] = useState(false);
    const [isLoadingSSH, setIsLoadingSSH] = useState(false);
    const [resultPing, setResultPing] = useState(null);
    const [resultSSH, setResultSSH] = useState(null);
    const [showPingResult, setShowPingResult] = useState(false); // State to control the visibility of ping result row

    const handlePingClick = async () => {
        try {
            seIsLoadingPing(true);
            const result = await runPingApi(netd_switch.ip_address);
            console.log(result)
            setResultPing(result.value);
            setShowPingResult(true); // Show ping result row after ping action is executed
        } catch (error) {
            console.error('Error:', error);
            setResultPing(false);
        } finally {
            seIsLoadingPing(false);
        }
    };
    const handleSSHClick = async (netd_switch) => {
        try {
            setIsLoadingSSH(true);
            const result = await sshConnectDeviceApi(netd_switch);
            console.log(result)
            setResultSSH(result.connection);
        } catch (error) {
            console.error('Error:', error);
            setResultSSH(false);
        } finally {
            setIsLoadingSSH(false);
        }
    };

    return(
        <>
            <Table.Cell textAlign={"right"}>
                <Button icon onClick={() => updateSwitch(netd_switch)}>
                    <Icon name={"pencil"}/>
                </Button>
                <Button icon negative onClick={() => onDeleteSwitch(netd_switch)}>
                    <Icon name={"close"}/>
                </Button>
                <Button icon loading={isLoadingPing} onClick={handlePingClick}>
                    <Icon name="play" color={resultPing !== null ? (resultPing ? "green" : "red") : "grey"} />
                </Button>
                <Button icon loading={isLoadingSSH} onClick={() => handleSSHClick(netd_switch)}>
                    <Icon name="rss" color={resultSSH !== null ? (resultSSH ? "green" : "red") : "grey"} />
                </Button>
                <Button icon onClick={() => sendCommand(netd_switch)}>
                    <Icon name="mail"/>
                </Button>
                <Button icon onClick={() => configFromFile(netd_switch)}>
                    <Icon name="box"/>
                </Button>
            </Table.Cell>
            {showPingResult && (
                <Table.Row>
                    <Table.Cell colSpan={8}>
                        Device {resultPing !== null ? (resultPing ? "reachable" : "unreachable") : "unknown"}
                    </Table.Cell>
                </Table.Row>
            )}
        </>
    )
}
