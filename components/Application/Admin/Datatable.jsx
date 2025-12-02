import React, { useState } from "react";
import { MaterialReactTable, MRT_ToggleGlobalFilterButton, useMaterialReactTable } from "material-react-table";
import { IconButton, Tooltip } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton } from 'material-react-table';
import RecyclingIcon from '@mui/icons-material/Recycling';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import useDeleteMutation from '@/hooks/useDeleteMutation';
import { ButtonLoading } from '../ButtonLoading';
import DownloadIcon from '@mui/icons-material/Download';
import { showToast } from '@/lib/showToast';
import { download, generateCsv, mkConfig } from 'export-to-csv';
const Datatable = ({
    queryKey,
    fetchurl,
    columsConfig,
    initialPageSize = 10,
    exportEndpoint,
    deleteEndpoint,
    deleteType,
    trashView,
    createAction }
) => {
    const [exportloading, setexportloading] = useState(false);
    const [coloumFilter, setcoloumFilter] = useState([]);
    const [globleFilter, setGlobleFilter] = useState([]);
    const [Sorting, setSorting] = useState([]);
    const [rowSelection, setrowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize
    });
    //Fetching logics 
    const {
        data: { data = [], meta } = {},
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: [
            queryKey,
            {
                coloumFilter, //refetch when columnFilters changes
                globleFilter, //refetch when globalFilter changes
                pagination, //refetch when pagination changes
                Sorting, //refetch when sorting changes
            },
        ],
        queryFn: async () => {
            const fetchURL = new URL(fetchurl, process.env.NEXT_PUBLIC_URL);
            fetchURL.searchParams.set(
                'start',
                `${pagination.pageIndex * pagination.pageSize}`,
            );
            fetchURL.searchParams.set('size', `${pagination.pageSize}`);
            fetchURL.searchParams.set('filters', JSON.stringify(coloumFilter ?? []));
            fetchURL.searchParams.set('globalFilter', globleFilter ?? '');
            fetchURL.searchParams.set('sorting', JSON.stringify(Sorting ?? []));
            fetchURL.searchParams.set('deleteType', deleteType);
            const response = await axios.get(fetchURL.href);
            const json = response.data;
            return json;
        },
        placeholderData: keepPreviousData
    })
    const deleteMutation = useDeleteMutation(queryKey, deleteEndpoint);

    const handleExportData = async (rows) => {
        setexportloading(true);
        try {
            const csvConfig = mkConfig({
                fieldSeparator: ',',
                decimalSeparator: '.',
                useKeysAsHeaders: true,
                fileName: 'export-data',

            });
            let csv
            if (Object.keys(rowSelection).length > 0) {
                const rowData = rows.map(row => row.original);
                csv = generateCsv(csvConfig)(rowData);

            } else {
                const { data: response } = await axios.get(exportEndpoint);

                if (!response.success) {
                    throw new Error(response.message || 'Failed to fetch data for export');
                }
                csv = generateCsv(csvConfig)(response.data);

            }
            download(csvConfig)(csv);

        } catch (error) {
            showToast('error', 'Failed to export data');
            console.error('Export Error:', error);
        } finally {
            setexportloading(false);
        }
    }
    const handleDelete = (ids, deleteType) => {

        let c = true;
        if (deleteType === 'PD') {
            c = confirm("Are you sure you want to permanently delete the selected media? This action cannot be undone.");
        } else if (deleteType === 'SD') {
            c = confirm("Are you sure you want to delete the selected media?");
        }
        if (c) {
            deleteMutation.mutate({ id: ids, deleteType });

            setrowSelection({});

        }

    }
    const table = useMaterialReactTable({
        columns: columsConfig,
        data,
        enableRowSelection: true,
        enablePagination: true,
        enableBottomToolbar: true,
        enableTopToolbar: true,
        columnFilteringMode: 'popover',
        enableColumnOrdering: true,
        enableStickyHeader: true,


        initialState: { showColumnFilters: true },
        manualFiltering: true, //turn off built-in client-side filtering
        manualPagination: true, //turn off built-in client-side pagination
        manualSorting: true, //turn off built-in client-side sorting
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        onColumnFiltersChange: setcoloumFilter,
        onGlobalFilterChange: setGlobleFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onRowSelectionChange: setrowSelection,
        renderToolbarInternalActions: ({ table }) => (
            <>
                <MRT_ToggleGlobalFilterButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleFullScreenButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />
                {deleteType !== 'PD'
                    &&
                    <Tooltip title="Recycele Bin">
                        <Link href={trashView}>
                            <IconButton disabled={table.getSelectedRowModel().rows.length === 0}
                                onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                            >
                                <RecyclingIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>

                }
                {deleteType == 'SD'
                    &&
                    <Tooltip title="Delete All">
                        <IconButton disabled={table.getSelectedRowModel().rows.length === 0}
                            onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                }
                {deleteType == 'PD'
                    &&
                    <>
                        <Tooltip title="Restore">
                            <IconButton disabled={table.getSelectedRowModel().rows.length === 0}
                                onClick={() => handleDelete(Object.keys(rowSelection), "RSD")}
                            >
                                <RestoreFromTrashIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Permanently">
                            <IconButton disabled={table.getSelectedRowModel().rows.length === 0}
                                onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </>

                }

            </>
        ),

        rowCount: meta?.totalRowCount || 0,
        state: {
            columnFilters: coloumFilter,
            globalFilter: globleFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting: Sorting,
            rowSelection,
        },
        getRowId: (originalRow) => originalRow._id,
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActionMenuItems: ({ row }) => createAction(row, deleteType, handleDelete),
        renderTopToolbarCustomActions: ({ table }) => (
            <Tooltip title="Export Data">
                <ButtonLoading
                    className="cursor-pointer"
                    type="button"
                    text={<><DownloadIcon /> Export</>}
                    loading={exportloading}
                    onClick={() => handleExportData(table.getSelectedRowModel().rows)}
                />
            </Tooltip>
        )
    });

    return (

        <MaterialReactTable table={table} />

    )
}


export default Datatable
