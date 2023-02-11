import { useQuery } from '@tanstack/react-query';

interface ReadApi {
    resource: string;
    method: Function;
    args?: Record<any, any>;
    enabled?: boolean;
    keepPreviousData?: boolean;
    initialData?: any;
    withPagination?: boolean;
    onError?: ((error: unknown) => void) | undefined;
}

const DEFAULT_PAGINATION = {
    previousPage: null,
    hasPrevious: false,
    nextPage: null,
    hasNext: false,
    total: null,
    limit: null,
    skip: null,
    totalPages: null
};

export const useApiRead = ({
    resource,
    method,
    initialData,
    args = {},
    enabled = true,
    keepPreviousData = false,
    withPagination = false,
    onError = () => {}
}: ReadApi) => {
    const { isLoading, isFetching, data } = useQuery({
        queryKey: [resource, ...Object.values(args)],
        queryFn: () => method(args),
        initialData,
        enabled,
        keepPreviousData,
        onError
    });

    return {
        loading: isLoading || isFetching,
        response: data?.data ?? data,
        paginated: withPagination ? data?.pagination ?? DEFAULT_PAGINATION : null
    };
};
