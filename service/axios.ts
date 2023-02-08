const axios = require('axios');

const PATH = 'http://localhost:3000/api/';

export const AxiosInstance = (() => {
    const instance = axios.create({ baseURL: PATH });

    return {
        get: (path: string) => instance.get(path).then(({ data }: any) => data)
    };
})();
