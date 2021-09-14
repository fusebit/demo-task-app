import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import {IntegrationType} from "./Types";
import {Integrations} from '../api';


const IntegrationCard = (props: {
    integration: IntegrationType
}) => {
    const capitalize = (string: string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
    const bodyTextMap: Record<IntegrationType, string> = {
        [IntegrationType.slack]: 'Get slack notifications when a new task is created.',
        [IntegrationType.hubspot]: 'Sync your hubspot task list here.'
    }

    const installApp = () => Integrations.installApp(props.integration);

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
                <Button size="small" color="primary">
                    Learn More
                </Button>
                <Button variant="contained" color="primary" onClick={installApp}>
                    Install App
                </Button>
            </CardActions>
        </Card>
    );
}
export default IntegrationCard;