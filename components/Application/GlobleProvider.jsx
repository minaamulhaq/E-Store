"use client"
import React from 'react'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/store/store'
import Loading from './Loading'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const GlobleProvider = ({ children }) => {
    const queryClient = new QueryClient()

    return (

        <QueryClientProvider client={queryClient}>

            <Provider store={store}>
                <PersistGate loading={<Loading />} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

    )
}

export default GlobleProvider
