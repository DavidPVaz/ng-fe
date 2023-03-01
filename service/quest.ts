import { AxiosInstance } from './axios';

const buildQueryString = (data: any = {}) => {
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => query.set(key, String(value)));
    const queryString = query.toString();

    return queryString ? `?${queryString}` : '';
};

const PATH = 'quests';

export const list = (data?: { limit: number; page: number }) => AxiosInstance.get(`${PATH}${buildQueryString(data)}`);

export const findById = ({ id }: { id: string }) => AxiosInstance.get(`${PATH}/${id}`);
