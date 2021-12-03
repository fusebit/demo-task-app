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

const TaskTable = (props: { tasks: Task[]; installedApp: Feed }) => {
  const tasks = props?.tasks?.map((task, index) => ({ ...task, index })) || [];
  const cellStyle = { color: !!props.installedApp ? '#3F51B5' : '#959595', fontWeight: 400 };

  return (
    <>
      <Typography fontSize="22px" fontWeight={500} sx={{ marginBottom: '32px' }}>
        Your {getItemName(props.installedApp, true)}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>{getPropertyFromIntegration(props.installedApp, 0, 'label')}</TableCell>
              <TableCell sx={cellStyle} align="left">
                {getPropertyFromIntegration(props.installedApp, 1, 'label')}
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
      {!props.installedApp && (
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
