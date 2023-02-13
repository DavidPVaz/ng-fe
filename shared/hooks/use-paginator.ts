import { useCallback, useMemo, useContext } from 'react';
import { useApiRead } from '@/shared/hooks';
import { StyledPaginator } from '@/shared/components';
import { RESOURCES } from '@/shared/enums';
import { PaginationContext } from '@/types';
import Context from '@/app/context';

interface PaginatorAPI {
    resource: RESOURCES;
    method: Function;
    onError?: ((error: unknown) => void) | undefined;
}

export const usePaginator = ({ resource, method, onError }: PaginatorAPI) => {
    const { paginationArgs, setPaginationArgs } = useContext<PaginationContext>(Context);

    const {
        response,
        paginated: { nextPage, previousPage, hasNext, hasPrevious, total, limit, skip, totalPages },
        loading
    } = useApiRead({
        resource,
        method,
        args: paginationArgs,
        withPagination: true,
        keepPreviousData: true,
        onError
    });

    const onPrevious = useCallback(
        () => hasPrevious && setPaginationArgs(args => ({ ...args, page: previousPage })),
        [hasPrevious, previousPage, setPaginationArgs]
    );
    const onNext = useCallback(
        () => hasNext && setPaginationArgs(args => ({ ...args, page: nextPage })),
        [hasNext, nextPage, setPaginationArgs]
    );
    const onFirst = useCallback(
        () => hasPrevious && setPaginationArgs(args => ({ ...args, page: 1 })),
        [hasPrevious, setPaginationArgs]
    );
    const onLast = useCallback(
        () => hasNext && setPaginationArgs(args => ({ ...args, page: totalPages })),
        [hasNext, totalPages, setPaginationArgs]
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
