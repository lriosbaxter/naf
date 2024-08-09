import React, {useEffect, useState} from 'react';
import { Table, Button, Icon} from "semantic-ui-react";
import './TableRouters.scss';
import {runPingApi, sshConnectDeviceApi } from "../../../../api/connections";
import {useSite} from "../../../../hooks";
export function TableRouters(props) {
    const { routers, updateRouter, onDeleteRouter, sendCommand, configFromFile, commandSended } = props
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
    if (routers === null || routers === undefined) {
        return <div>No routers data available</div>;
    }
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Hostname</Table.HeaderCell>
                    <Table.HeaderCell>Ip Address</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>SSH</Table.HeaderCell>
                    <Table.HeaderCell>Site</Table.HeaderCell>
                    <Table.HeaderCell>Edit/Eliminate/Ping/SSH/Commands</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {routers.map((nd_router, index) => {
                    const filteredSite = nd_router.site !== null ? getSiteById(nd_router.site) : null;
                    return (
                        <Table.Row key={index}>
                            <Table.Cell>{nd_router.hostname}</Table.Cell>
                            <Table.Cell>{nd_router.ip_address}</Table.Cell>
                            <Table.Cell>{nd_router.device_type}</Table.Cell>
                            <Table.Cell>{nd_router.domain_ssh}</Table.Cell>
                            <Table.Cell>{filteredSite ? filteredSite : 'Site not found'}</Table.Cell>
                            <Table.Cell>
                                <Actions router={nd_router} updateRouter={updateRouter} onDeleteRouter={onDeleteRouter} sendCommand={sendCommand} configFromFile={configFromFile}/>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}

function Actions(props) {
    const { router, updateRouter, onDeleteRouter, sendCommand, configFromFile, commandSended} = props
    const [isLoadingPing, seIsLoadingPing] = useState(false);
    const [isLoadingSSH, setIsLoadingSSH] = useState(false);
    const [resultPing, setResultPing] = useState(null);
    const [resultSSH, setResultSSH] = useState(null);
    const [showPingResult, setShowPingResult] = useState(false); // State to control the visibility of ping result row

    const handlePingClick = async () => {
        try {
            seIsLoadingPing(true);
            const result = await runPingApi(router.ip_address);
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
    const handleSSHClick = async (router) => {
        try {
            setIsLoadingSSH(true);
            const result = await sshConnectDeviceApi(router);
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
                <Button icon onClick={() => updateRouter(router)}>
                    <Icon name={"pencil"}/>
                </Button>
                <Button icon negative onClick={() => onDeleteRouter(router)}>
                    <Icon name={"close"}/>
                </Button>
                <Button icon loading={isLoadingPing} onClick={handlePingClick}>
                    <Icon name="play" color={resultPing !== null ? (resultPing ? "green" : "red") : "grey"} />
                </Button>
                <Button icon loading={isLoadingSSH} onClick={() => handleSSHClick(router)}>
                    <Icon name="rss" color={resultSSH !== null ? (resultSSH ? "green" : "red") : "grey"} />
                </Button>
                <Button icon onClick={() => sendCommand(router)}>
                    <Icon name="mail"/>
                </Button>
                <Button icon onClick={() => configFromFile(router)}>
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


