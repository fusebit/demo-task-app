import React from 'react';
import {Grid} from "@material-ui/core";

export default (props: React.PropsWithChildren<{}>) => (
    <Grid container className="container-buffer">
        {props.children}
    </Grid>
)