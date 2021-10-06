import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { IntegrationType } from '../constants';

const IntegrationCard = (props: {
  integration: IntegrationType;
  isInstalled: boolean;
  onUninstall: Function;
}) => {
  const capitalize = (string: string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
  const bodyTextMap: Record<IntegrationType, string> = {
    [IntegrationType.slack]: 'Get slack notifications when a new task is created.',
    [IntegrationType.hubspot]: 'Sync your hubspot task list here.',
  };

  const installApp = () => (window.location.href = `/api/integration/install`);
  const uninstallApp = () => props.onUninstall();

  return (
    <Card className="integration-card">
      <CardActionArea>
        <CardMedia
          className="integration-media"
          image={`/static/${props.integration}.png`}
          title={capitalize(props.integration)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {capitalize(props.integration)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bodyTextMap[props.integration]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <span className="spacer" />
        <Button variant="contained"
                color={props.isInstalled ? 'primary' : 'secondary'}
                onClick={props.isInstalled ? uninstallApp : installApp}
        >
          {props.isInstalled ? 'Uninstall' : 'Install'}
        </Button>
      </CardActions>
    </Card>
  );
};
export default IntegrationCard;
