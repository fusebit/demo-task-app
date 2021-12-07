import StatusPaper from './StatusPaper';
import { CircularProgress, Fade, Typography, Box } from '@mui/material';
import TaskInput from './TaskInput';
import React, { useEffect, useState } from 'react';
import TaskTable from './TaskTable';
import PageItem from './PageItem';
import Page from './Page';
import IntegrationFeedback from './IntegrationFeedback';
import { getPropertyFromIntegration, getTextFromIntegration, getItemName } from '../utils';

export default (props: { userData: UserData; appToTest: Feed; isInstalled: boolean }) => {
  const integrationId = props.appToTest?.integrationId;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(true);
  const [alertProps, setAlertProps] = useState<{ text: string; severity: 'error' | 'warning' | 'info' | 'success' }>();
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [isSavingTask, setSavingTask] = useState<boolean>(false);

  useEffect(() => {
    if (!refreshFlag || !props.isInstalled) {
      setHasLoaded(true);
      return;
    }

    let mounted = true;
    const query: Record<string, string> = {
      integrationId,
    };

    if (props.appToTest?.resources?.sampleConfig?.isGetEnabled) {
      query.isGetEnabled = 'true';
    }

    fetch(`/api/task?${new URLSearchParams(query)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('configuration')}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'include',
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        return response.json();
      })
      .then((tasks) => {
        if (mounted) {
          setTasks(tasks);
        }
      })
      .catch((error) => {
        console.log(error);
        if (mounted) {
          setAlertProps({
            severity: 'error',
            text: getTextFromIntegration(
              props.appToTest,
              'getFail',
              'There was an error getting the integration items.'
            ),
          });
        }
      })
      .finally(() => {
        setRefreshFlag(false);
        setHasLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, [refreshFlag, props.appToTest]);

  const saveTask = async (task: Task) => {
    try {
      setSavingTask(true);
      const response = await fetch('/api/task', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('configuration')}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'POST',
        body: JSON.stringify({
          [getPropertyFromIntegration(props.appToTest, 0, 'name')]: task.name,
          [getPropertyFromIntegration(props.appToTest, 1, 'name')]: task.description,
          integrationId,
          isGetEnabled: props.appToTest?.resources?.sampleConfig?.isGetEnabled || false,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      setAlertProps({
        severity: 'success',
        text: getTextFromIntegration(props.appToTest, 'postSuccess', 'Integration triggered!'),
      });
      setRefreshFlag(true);
    } catch (error) {
      console.log(error);
      setAlertProps({
        severity: 'error',
        text: getTextFromIntegration(props.appToTest, 'postFail', 'There was an error triggering the integration.'),
      });
    } finally {
      setSavingTask(false);
    }
  };

  const getBody = () => {
    if (hasLoaded) {
      return <TaskTable tasks={tasks} appToTest={props.appToTest} isInstalled={props.isInstalled} />;
    }

    return (
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
  };

  const handleCloseFeedback = () => {
    setTimeout(() => {
      setAlertProps(undefined);
    }, 1000);
  };

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
                {`In this example, the "Add New ${getItemName(
                  props.appToTest
                )}" Button, if installed, will use your integration code to immediately
                update your user via Slack! Look at the code to see how it works, and learn more in the docs here.`}
              </Typography>
            </>
          </StatusPaper>
        </Box>
      </PageItem>
      <PageItem>
        <Typography fontSize="22px" fontWeight={500} sx={{ marginBottom: '32px' }}>
          Your {getItemName(props.appToTest, true)}
        </Typography>
      </PageItem>
      <PageItem>
        {(!props.appToTest || props.appToTest?.resources?.sampleConfig?.isPostEnabled) && (
          <TaskInput
            appToTest={props.appToTest}
            onTaskCreated={saveTask}
            isLoading={isSavingTask}
            isInstalled={props.isInstalled}
          />
        )}
      </PageItem>
      <PageItem>{getBody()}</PageItem>
      <IntegrationFeedback {...alertProps} onClose={handleCloseFeedback} />
    </Page>
  );
};
