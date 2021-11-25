import React from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { IntegrationTypeEnum } from '../../constants';

const IntegrationCard = (props: {
  integration: IntegrationType;
  isInstalled: boolean;
  onUninstall: Function;
  enabledTypes: IntegrationType[];
}) => {
  const capitalize = (string: string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
  const installApp = () => (window.location.href = `/api/integration/${props.integration}/install`);
  const uninstallApp = () => props.onUninstall(props.integration);

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
            {IntegrationTypeEnum[props.integration].action}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <span className="spacer" />
        <Button
          variant="contained"
          color={props.isInstalled ? 'primary' : 'secondary'}
          onClick={props.isInstalled ? uninstallApp : installApp}
          disabled={!props.enabledTypes.includes(props.integration)}
        >
          {props.isInstalled ? 'Uninstall' : 'Install'}
        </Button>
      </CardActions>
    </Card>
  );
};
export default IntegrationCard;
