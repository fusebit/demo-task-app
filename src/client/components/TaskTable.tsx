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
import { getPropertyFromIntegration } from '../utils';
import { useCustomColorsContext } from './useCustomColorsContext';

const TaskTable = (props: { tasks: Task[]; appToTest: Feed; isInstalled: boolean }) => {
  const cellTitleStyle = { color: '#959595', fontWeight: 600, fontSize: '16px', lineHeight: '24px' };
  const cellRowStyle = { color: '#241C15', fontSize: '16px', lineHeight: '24px' };

  return (
    <>
      <TableContainer component={Paper} sx={{ width: 805, boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={cellTitleStyle}>{getPropertyFromIntegration(props.appToTest, 0, 'label')}</TableCell>
              <TableCell sx={cellTitleStyle} align="left">
                {getPropertyFromIntegration(props.appToTest, 1, 'label')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map((task) => (
              <TableRow key={task.index}>
                <TableCell sx={cellRowStyle} component="th" scope="row">
                  {task[getPropertyFromIntegration(props.appToTest, 0, 'name') as keyof typeof task]}
                </TableCell>
                <TableCell sx={cellRowStyle} align="left">
                  {task[getPropertyFromIntegration(props.appToTest, 1, 'name') as keyof typeof task]}
                </TableCell>
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
