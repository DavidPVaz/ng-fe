import React, { createContext, useCallback, useState } from 'react';
import { PaginatorArgs, PaginationContext } from '@/types';

const DEFAULT = {
    paginationArgs: {
        limit: 6,
        page: 1
    },
    setPaginationArgs: () => {}
};

const Context = createContext<PaginationContext>(DEFAULT);

const PaginationContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [paginationArgs, setPaginationArgs] = useState<PaginatorArgs>(DEFAULT.paginationArgs);

    const context = {
        paginationArgs,
        setPaginationArgs: useCallback(setPaginationArgs, [setPaginationArgs])
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default Context;
export { PaginationContextProvider };
