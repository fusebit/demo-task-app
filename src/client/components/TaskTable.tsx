import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { Link as RouterLink } from 'react-router-dom';

const TaskTable = (props: { tasks: Task[]; isInstalled: boolean }) => {
  const tasks = props?.tasks?.map((task, index) => ({ ...task, index })) || [];
  const cellStyle = { color: props.isInstalled ? '#3F51B5' : '#959595', fontWeight: 400 };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>Task Name</TableCell>
              <TableCell sx={cellStyle} align="left">
                Task Detail
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.reverse().map((task) => (
              <TableRow key={task.index}>
                <TableCell component="th" scope="row">
                  {task.name}
                </TableCell>
                <TableCell align="left">{task.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.isInstalled && (
        <Box display="flex" alignItems="center" mt="80px">
          <WarningIcon color="error" sx={{ marginRight: '13px' }} />
          <Typography color="#333333">
            It looks like you don’t have the integration installed. Please, install it from the{' '}
            <RouterLink to="/marketplace" style={{ color: '#333333' }}>
              Integrations Marketplace
            </RouterLink>{' '}
            first.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TaskTable;
