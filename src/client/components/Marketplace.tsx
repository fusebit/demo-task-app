import React from 'react';
import Page from './Page';
import PageItem from './PageItem';
import StatusPaper from './StatusPaper';
import { Typography, Box, Button } from '@mui/material';
import { Marketplace as FusebitMarketplace } from '@fusebit/react-marketplace';
import '/Users/shehzad/Documents/Fusebit/code/FusebitSampleApp/demo-task-app/src/client/components/App.css';


const Marketplace = (props: {
  userData: UserData;
  onUninstall: (integrationId: string) => Promise<void>;
  getInstallUrl: (integrationId: string) => Promise<string>;
}) => {
  return (
        <FusebitMarketplace
          onUninstallClick={props.onUninstall}
          getInstallUrl={props.getInstallUrl}
          getIntegrations={() => props.userData?.list || []}
          hideDescription={true}
          isDemo
        />
  );
}   


/* 



  classes?: {
  link?: string;
  card?: string;
  topContent?: string;
  bottomContent?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  button?: string;
  imagesWrapper?: string;
  buttonsWrapper?: string;
  spinner?: string;
}; */
export default Marketplace;
