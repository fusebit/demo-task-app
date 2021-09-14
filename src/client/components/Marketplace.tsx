import React from 'react';
import Page from "./Page";
import PageItem from "./PageItem";
import StatusPaper from "./StatusPaper";
import {Grid, Typography} from "@material-ui/core";
import IntegrationCard from "./IntegrationCard";
import {IntegrationType} from "./Types";

const Marketplace = () => {
    return (
        <Page>
            <PageItem>
                <StatusPaper elevation={24}>
                    <Typography>Fusebit handles Authentification for you!</Typography>
                    <p>Fusebit handles all the overhead of authenticating tenants and wiring up their configurations to a specific install for you.  Once you've installed the app, <strong>head on over the the fusebit management portal</strong> to see it.</p>
                    <p>Note: This sample app is currently limited to one integratino for demonstration purposes.</p>
                </StatusPaper>
            </PageItem>
            <PageItem>
                <Typography>Available Integrations</Typography>
            </PageItem>
            <PageItem>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <IntegrationCard integration={IntegrationType.slack}/>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={4}>
                        <IntegrationCard integration={IntegrationType.hubspot}/>
                    </Grid>
                </Grid>
            </PageItem>
        </Page>
    )
}

export default Marketplace;