"use client"
import { darkTheme, lightTheme } from '@/lib/matrialTheam'
import { ThemeProvider } from '@mui/material'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import Datatable from './Datatable'


const DatatableWraper = ({
    queryKey,
    fetchurl,
    columsConfig,
    initialPageSize,
    exportEndpoint,
    deleteEndpoint,
    deleteType,
    trashView,
    createAction
}) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    })
    if (!mounted) {
        return null;
    }
    return (
        <ThemeProvider theme={resolvedTheme === 'dark' ? darkTheme : lightTheme}>
            <Datatable
                queryKey={queryKey}
                fetchurl={fetchurl}
                columsConfig={columsConfig}
                initialPageSize={initialPageSize}
                exportEndpoint={exportEndpoint}
                deleteEndpoint={deleteEndpoint}
                deleteType={deleteType}
                trashView={trashView}
                createAction={createAction}
            />
        </ThemeProvider>
    )
}

export default DatatableWraper
