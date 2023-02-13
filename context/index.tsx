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

    return <Context.Provider value={{ paginationArgs, setPaginationArgs }}>{children}</Context.Provider>;
};

export default Context;
export { PaginationContextProvider };
