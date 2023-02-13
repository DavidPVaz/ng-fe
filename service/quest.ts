import { AxiosInstance } from './axios';

const buildQueryString = (data: Record<any, any> = {}) => {
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => query.set(key, value));
    const queryString = query.toString();

    return queryString ? `?${queryString}` : '';
};

const PATH = 'quests';

const getList = ({ path, data }: { path: string; data?: { limit: number; page: number } | undefined }) =>
    AxiosInstance.get(`${path}${buildQueryString(data)}`);
const getById = ({ path, data: { id } }: { path: string; data: { id: string } }) => AxiosInstance.get(`${path}/${id}`);

export const list = (data?: { limit: number; page: number }) => getList({ path: PATH, data });

export const findById = (data: { id: string }) => getById({ path: PATH, data });
