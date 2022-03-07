export const getPropertyFromIntegration = (feed?: Feed, propertyIndex?: number, type?: 'label' | 'name') => feed?.resources?.sampleConfig?.terms?.properties[propertyIndex][type] || ''
export const getTextFromIntegration = (feed?: Feed, key?: keyof Omit<Feed['resources']['sampleConfig']['terms'], 'properties'>, defaultText?: string) => feed?.resources?.sampleConfig?.terms?.[key] || defaultText || '';
export const getItemName = (feed?: Feed, plural?: boolean) => plural ? getTextFromIntegration(feed, 'itemNamePlural') || `${getTextFromIntegration(feed, 'itemName', 'Item')}s` : getTextFromIntegration(feed, 'itemName', 'Item')