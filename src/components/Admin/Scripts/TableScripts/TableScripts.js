import React from 'react'
import { Table, Button, Icon } from 'semantic-ui-react'
import './TableScripts.scss'
import { map } from 'lodash';

export default function TableScripts(props) {
    const { scripts, updateScript, onDeleteScript, loadSourceCode } = props;
    console.log(scripts)
  return (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Repository name</Table.HeaderCell>
                <Table.HeaderCell>Archive name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Source folder</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {map(scripts, (script, index) => (
                <Table.Row key={index}>
                    <Table.Cell>{script.title}</Table.Cell>
                    <Table.Cell>{script.repository_name}</Table.Cell>
                    <Table.Cell>{script.py_archive_name}</Table.Cell>
                    <Table.Cell>{script.type_script}</Table.Cell>
                    <Table.Cell>{script.source_folder_id}</Table.Cell>
                    <Table.Cell>{script.created}</Table.Cell>
                    <Table.Cell>
                        <Actions script={script} updateScript={updateScript} onDeleteScript={onDeleteScript} loadSourceCode={loadSourceCode} gitLink = {`https://bitbucket-prod.aws.baxter.com/projects/BNIC/repos/bnic/browse/${script.repository_name}/${script.py_archive_name}`}/>
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
  )
}

function Actions(props) {
    const { script, updateScript, onDeleteScript, loadSourceCode, gitLink } = props
    return(
        <>
            <Table.Cell textAlign={"right"}>
            <Button icon onClick={() => loadSourceCode(script)}>
                    <Icon name={"code branch"}/>
                </Button>
                <Button href={gitLink}>
                    <Icon name={"github"}/>
                </Button>
                <Button icon onClick={() => updateScript(script)}>
                    <Icon name={"pencil"}/>
                </Button>
                <Button icon negative onClick={() => onDeleteScript(script)}>
                    <Icon name={"close"}/>
                </Button>
            </Table.Cell>
        </>
    )
}