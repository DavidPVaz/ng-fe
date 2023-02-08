import { useQuery } from '@tanstack/react-query';

type API_READ_ARGS = {
    resource: string;
    method: Function;
    args?: Record<any, any>;
    enabled?: boolean;
    keepPreviousData?: boolean;
    initialData?: any;
};

type Error = { message?: string } | string | any;

const getMessage = (error: Error) => error?.message ?? error;

export const useApiRead = ({
    resource,
    method,
    initialData,
    args = {},
    enabled = true,
    keepPreviousData = false
}: API_READ_ARGS) => {
    const { isLoading, isFetching, data, error } = useQuery({
        queryKey: [resource, ...Object.values(args)],
        queryFn: () => method(args),
        initialData,
        enabled,
        keepPreviousData
    });

    return {
        loading: isLoading || isFetching,
        response: data?.data ?? data,
        error: getMessage(error)
    };
};
