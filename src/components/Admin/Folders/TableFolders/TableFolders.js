import React from 'react'
import { Table, Button, Icon, Portal } from 'semantic-ui-react'
import './TableFolders.scss'
import { map } from 'lodash';

export default function TableFolders(props) {
    const { sourceFolders, updateFolder, onDeleteFolder } = props;
    console.log(props)
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Source name</Table.HeaderCell>
                    <Table.HeaderCell>Folder Type</Table.HeaderCell>
                    <Table.HeaderCell>Scripts</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(sourceFolders, (folder, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{folder.name_source}</Table.Cell>
                        <Table.Cell>{folder.type_folder}</Table.Cell>
                        <Table.Cell>{folder.number_scripts}</Table.Cell>
                        <Table.Cell>
                            <Actions folder={folder} updateFolder={updateFolder} onDeleteFolder={onDeleteFolder}/>
                        </Table.Cell>

                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { folder, updateFolder, onDeleteFolder } = props
    return(
        <>
            <Table.Cell textAlign={"right"}>
                <Button icon onClick={() => updateFolder(folder)}>
                    <Icon name={"pencil"}/>
                </Button>
                <Button icon negative onClick={() => onDeleteFolder(folder)}>
                    <Icon name={"close"}/>
                </Button>
            </Table.Cell>
        </>
    )
}