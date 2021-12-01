import StatusPaper from './StatusPaper';
import { CircularProgress, Fade, Typography, Box } from '@mui/material';
import TaskInput from './TaskInput';
import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import PageItem from './PageItem';
import Page from './Page';
import IntegrationFeedback from './IntegrationFeedback';

export default (props: { userData: UserData }) => {
  // TODO: For now, this sample app only supports one integration at a time.  This will be updated in the future to support multiple integrations.
  const installedAppsKeys = Object.keys(props.userData.integrations || {});
  const installedApp =
    installedAppsKeys.length > 0
      ? props.userData.integrationList.available.find((i) => i.id === installedAppsKeys[0])
      : null;
  const integrationId = installedApp?.integrationId;

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
    try {
      const response = await fetch('/api/task', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('configuration')}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'POST',
        body: JSON.stringify({ ...task, integrationId }),
        credentials: 'include',
      });

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text);
      }

      setTasks(await response.json());
      alert();
    } catch (error) {
      console.log(error);
      setAlertProps({ severity: 'warning', text: 'There was an error calling triggering the integration.' });
    }
  };

  const alert = () => {
    const severity = installedApp ? 'success' : 'warning';

    const message = installedApp
      ? installedApp?.sampleConfig?.taskDoneText || 'Integration triggered!'
      : 'Head to the Integration Marketplace to pick one integration';

    setAlertProps({ severity, text: message });
  };

  const Body = () =>
    hasLoaded ? (
      <TaskTable tasks={tasks} isInstalled={!!installedApp} />
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
        <TaskInput installedApp={installedApp} onTaskCreated={saveTask} />
      </PageItem>
      <PageItem>
        <Body />
      </PageItem>
      <IntegrationFeedback {...alertProps} />
    </Page>
  );
};
