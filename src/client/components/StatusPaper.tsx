import React from 'react';
import {Paper} from "@material-ui/core";

export default class StatusPaper extends React.Component<any, any> {
    render() {
        const paperProps: object = {...this.props};
        return <Paper square  {...paperProps}>
                <div style={{
                    padding: '10px',
                    border: '0px',
                    borderLeft: '8px',
                    borderStyle: 'solid',
                    borderColor: this.props.color || 'black'}}
                >
                    {this.props.children}
                </div>
            </Paper>
    }
}