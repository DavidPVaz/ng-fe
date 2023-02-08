import { AxiosInstance } from './axios';

const buildQueryString = (data: Record<any, any> = {}) => {
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => query.set(key, value));
    const queryString = query.toString();

    return queryString ? `?${queryString}` : '';
};

const LIST_PATH = 'quests';

const get = ({ path, data }: { path: string; data?: Record<any, any> }) =>
    AxiosInstance.get(`${path}${buildQueryString(data)}`);

export const list = async (data?: Record<any, any>) => get({ path: LIST_PATH, data });
