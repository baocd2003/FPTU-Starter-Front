import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
function TableAdmin({data}) {
    const columns = ['Tên', 'Số tiền giao dịch', 'Thời gian giao dịch']
    return (
        <TableContainer sx={{ maxHeight: 440 }} className='bg-[#FFFFFF]'>
            <Table stickyHeader aria-label="sticky table">
                <TableHead >
                    <TableRow >
                        {columns.map((column, id) => (
                            <TableCell
                                key={id}
                                style={{ minWidth: column.minWidth }}
                                sx={{backgroundColor: '#FBB03B !important', color:'#FFFF'}}
                            >
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.backerName}</TableCell>
                            <TableCell>{item.totalAmount}</TableCell>
                            <TableCell>{new Date(item.createDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableAdmin