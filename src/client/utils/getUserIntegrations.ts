import jwt_decode from 'jwt-decode';

declare var env: Config

export const getFeedIdFromEnvPrefix = (envPrefix: string) => envPrefix.replaceAll('_', '-').toLowerCase()
export const getEnvPrefixFromFeedId = (feedId: string) => feedId.replaceAll('-', '_').toUpperCase()
export const getIntegrationId = (envPrefix: string) => env[`${envPrefix}_INTEGRATION_ID` as keyof Config]

export const getUserIntegrations = () => {
    let config = {} as Config
    const token = localStorage.getItem('configuration')

    if (token) {
        config = jwt_decode(token)
    } else {
        config = env
    }

    return Object.keys(config).filter(key => key.endsWith('_INTEGRATION_ID') && !!config[key as keyof Config]).map(i => {
        const envPrefix = i.replace('_INTEGRATION_ID', '')

        return getFeedIdFromEnvPrefix(envPrefix)
    })
}