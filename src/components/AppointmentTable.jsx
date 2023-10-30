import { useMemo } from "react"
import { useTable } from 'react-table'
import styles from './Styles/appointment-table.module.css'

export default function AppointmentTable({ appointments }) {
    const users = appointments;

    const data = useMemo(() => users, [users]);
    const columns = useMemo(() => [
        {
            Header: "Nome",
            accessor: "nome"
        },
        {
            Header: "Data",
            accessor: "date"
        },
        {
            Header: "Horário",
            accessor: "hour"
        },
        {
            Header: "Celular",
            accessor: "celular"
        },
        {
            Header: "ID de Agendamento",
            accessor: "id"
        },
        {
            Header: "Serviço",
            accessor: "service"
        },
        {
            Header: "Profissional",
            accessor: "professional"
        },
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })
    return (
        <div className={styles.container}>
            <table {...getTableProps}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr key={i} {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                ))}
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </div>
    )
}
