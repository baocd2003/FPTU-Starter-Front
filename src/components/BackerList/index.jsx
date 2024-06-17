import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar } from '@mui/material';
function BackerList({data}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    
      };
  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell align="left">Tên người ủng hộ</TableCell>
        <TableCell align="left">Số tiền ủng hộ</TableCell>
        <TableCell align="left">Ngày ủng hộ</TableCell>
        <TableCell align="left">Loại ủng hộ</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
        {data.map((item,i) => (
            <TableRow key={i}>
                <TableCell>{item.backerUrl ? <Avatar src={item.backerUrl}/> : <Avatar>H</Avatar>}</TableCell>
                <TableCell align="left">{item.backerName}</TableCell>
                <TableCell align="left">{item.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</TableCell>
                <TableCell align="left">{formatDate(item.createDate)}</TableCell>
                <TableCell align="left">{item.transactionTypes}</TableCell>
            </TableRow>
        ))}
    </TableBody>
    </Table>
  )
}

export default BackerList