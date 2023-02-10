import { useState, useCallback, useMemo } from 'react';
import { useApiRead } from '@/shared/hooks';
import { StyledPaginator } from '@/shared/components';
import { RESOURCES } from '@/shared/enums';

type ARGS = {
    page: number;
    limit: number;
};

interface PaginatorAPI {
    initialApiArgs?: ARGS;
    resource: RESOURCES;
    method: Function;
    onError?: ((error: unknown) => void) | undefined;
}

export const usePaginator = ({ initialApiArgs = { page: 1, limit: 6 }, resource, method, onError }: PaginatorAPI) => {
    const [args, setArgs] = useState(initialApiArgs);

    const {
        response,
        paginated: { nextPage, previousPage, hasNext, hasPrevious, total, limit, skip, totalPages },
        loading
    } = useApiRead({
        resource,
        method,
        args,
        withPagination: true,
        keepPreviousData: true,
        onError
    });

    const onPrevious = useCallback(
        () => hasPrevious && setArgs(args => ({ ...args, page: previousPage })),
        [hasPrevious, previousPage, setArgs]
    );
    const onNext = useCallback(
        () => hasNext && setArgs(args => ({ ...args, page: nextPage })),
        [hasNext, nextPage, setArgs]
    );
    const onFirst = useCallback(() => hasPrevious && setArgs(args => ({ ...args, page: 1 })), [hasPrevious, setArgs]);
    const onLast = useCallback(
        () => hasNext && setArgs(args => ({ ...args, page: totalPages })),
        [hasNext, totalPages, setArgs]
    );
    const description = useMemo(
        () => (loading ? 'Loading...' : `Showing ${skip + 1} to ${skip + limit} of ${total}.`),
        [loading, skip, limit, total]
    );

    return {
        response,
        Paginator: StyledPaginator,
        paginatorProps: {
            onFirst,
            onPrevious,
            onNext,
            onLast,
            description,
            hasNext,
            hasPrevious
        }
    };
};
