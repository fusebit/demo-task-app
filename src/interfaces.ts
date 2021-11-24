export interface Feed {
  id: string;
  name: string;
  description: string;
  smallIcon: string;
  largeIcon: string;
  version: string;
  outOfPlan: boolean;
  tags: {
    service: string;
    catalog: string;
  };
}
