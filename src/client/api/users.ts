// @ts-nocheck
import {IntegrationType, User} from "../components/Types";
const headers = {
    "Content-Type":"application/json; charset=utf-8"
}

export const IntegrationIdMap = {
    [IntegrationType.slack]: env.SLACK_INTEGRATION,
    [IntegrationType.hubspot]: env.HUBSPOT_INTEGRATION
}

export const login = async (tenant: User) => {
    console.log('sending', tenant)
    const response = await fetch('/api/users/login', {body:JSON.stringify(tenant), method: 'POST',  headers });
    return response.json();
};

export const logout = async () => {
    await fetch('/api/users/logout', {method: 'DELETE'});
}

export const me = async () => {
    const response = await fetch('/api/users/me');
    return response.json();
}