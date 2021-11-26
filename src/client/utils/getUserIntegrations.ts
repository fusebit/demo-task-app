import jwt_decode from 'jwt-decode';

declare var env: Config

export const getUserIntegrations = () => {
    let config = {} as Config
    const token = localStorage.getItem('configuration')

    if (token) {
        config = jwt_decode(token)
    } else {
        config = env
    }

    return Object.keys(config).filter(key => key.endsWith('INTEGRATION_ID') && !!config[key as keyof Config]).map(i => {
        return {
            feedId: i.split('_')[0],
            id: config[i as keyof Config]
        }
    })
}