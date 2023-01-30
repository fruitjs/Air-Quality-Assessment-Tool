import { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
export function ComparisionTable(props) {


    return (

        <Table celled >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Country</Table.HeaderCell>
                    <Table.HeaderCell>City</Table.HeaderCell>
                    <Table.HeaderCell>Count</Table.HeaderCell>
                    <Table.HeaderCell>Unit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.groupDom}
            </Table.Body>
        </Table>


    );

}