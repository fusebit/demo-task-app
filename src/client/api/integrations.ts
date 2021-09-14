// @ts-nocheck
import {IntegrationType} from "../components/Types";

export const IntegrationIdMap = {
    [IntegrationType.slack]: env.SLACK_INTEGRATION,
    [IntegrationType.hubspot]: env.HUBSPOT_INTEGRATION
}

export const installApp = async (integration: IntegrationType) => {
    const integrationId = IntegrationIdMap[integration];
    window.location.href = `/api/integration/${integrationId}/install`;
}