import jwt_decode from 'jwt-decode';


export const getUserIntegrations = () => {
    const token = localStorage.getItem('configuration')

    if (!token) {
        return []
    }

    const config = jwt_decode(token) as Config

    return Object.keys(config).filter(key => key.endsWith('INTEGRATION_ID')).map(i => {
        return {
            feedId: i.split('_')[0],
            id: config[i as keyof Config]
        }
    })
}