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
import { getItemName, getPropertyFromIntegration } from '../utils';

const TaskTable = (props: { tasks: Task[]; appToTest: Feed }) => {
  const cellStyle = { color: !!props.appToTest ? '#3F51B5' : '#959595', fontWeight: 400 };

  return (
    <>
      <Typography fontSize="22px" fontWeight={500} sx={{ marginBottom: '32px' }}>
        Your {getItemName(props.appToTest, true)}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>{getPropertyFromIntegration(props.appToTest, 0, 'label')}</TableCell>
              <TableCell sx={cellStyle} align="left">
                {getPropertyFromIntegration(props.appToTest, 1, 'label')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map((task) => (
              <TableRow key={task.index}>
                <TableCell component="th" scope="row">
                  {task[getPropertyFromIntegration(props.appToTest, 0, 'name') as keyof typeof task]}
                </TableCell>
                <TableCell align="left">
                  {task[getPropertyFromIntegration(props.appToTest, 1, 'name') as keyof typeof task]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.appToTest && (
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
