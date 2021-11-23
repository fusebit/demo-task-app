import StatusPaper from './StatusPaper';
import { CircularProgress, Fade, Typography, Box } from '@mui/material';
import TaskInput from './TaskInput';
import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import PageItem from './PageItem';
import Page from './Page';
import IntegrationFeedback from './IntegrationFeedback';

export default (props: { integrations: Partial<Record<IntegrationType, any>> }) => {
  // TODO: For now, this sample app only supports the Slack integration.  This will be updated in the future to support other integrations.
  const isSlackInstalled = !!props.integrations.SLACK;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(true);
  const [alertProps, setAlertProps] = useState<{ text: string; severity: 'error' | 'warning' | 'info' | 'success' }>();
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!refreshFlag) {
      return;
    }
    let mounted = true;
    fetch('/api/task', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('configuration')}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((tasks) => {
        if (mounted) {
          setTasks(tasks);
          setRefreshFlag(false);
          setHasLoaded(true);
        }
      });
    return () => {
      mounted = false;
    };
  }, [refreshFlag]);

  const saveTask = async (task: Task) => {
    const response = await fetch('/api/task', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('configuration')}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      method: 'POST',
      body: JSON.stringify(task),
      credentials: 'include',
    });
    setTasks(await response.json());
    alert();
  };

  const alert = () => {
    const severity = isSlackInstalled ? 'success' : 'warning';

    const message = isSlackInstalled
      ? 'A message is being sent to your slack account.'
      : 'Head to the Integration Marketplace to install the Slack Integration';

    setAlertProps({ severity, text: message });
  };

  const Body = () =>
    hasLoaded ? (
      <TaskTable tasks={tasks} />
    ) : (
      <Fade
        in
        style={{
          transitionDelay: '800ms',
        }}
        unmountOnExit
        timeout={1000}
      >
        <CircularProgress size="400" style={{ margin: 'auto', display: 'flex', padding: 20 }} />
      </Fade>
    );

  return (
    <Page>
      <PageItem>
        <Box mb="80px" mt="36px">
          <StatusPaper title="Fusebit Integrations in Action!" elevation={24}>
            <>
              <Typography>
                Fusebit automatically checks if the specific user (or user) has installed the integration in their
                account. You can use this information to enable / disable different actions in the system.
              </Typography>
              <Typography>
                In this example, the "Add New Task" Button, if installed, will use your integration code to immediately
                update your user via Slack! Look at the code to see how it works, and learn more in the docs here.
              </Typography>
            </>
          </StatusPaper>
        </Box>
      </PageItem>
      <PageItem>
        <TaskInput onTaskCreated={saveTask} isInstalled={isSlackInstalled} />
      </PageItem>
      <PageItem>
        <Body />
      </PageItem>
      <IntegrationFeedback {...alertProps} />
    </Page>
  );
};
