export const coloumnConfig = (coloumn, isCreatedAt = false, isUpdatedAt = false, isDeletedAt = false) => {
    const config = [...coloumn];
    if (isCreatedAt) {
        config.push({
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({ renderedCellValue }) => new Date(renderedCellValue).toLocaleDateString(),
        });
    }
    if (isUpdatedAt) {
        config.push({
            accessorKey: 'updatedAt',
            header: 'Updated At',
            cell: ({ renderedCellValue }) => new Date(renderedCellValue).toLocaleDateString(),
        });
    }
    if (isDeletedAt) {
        config.push({
            accessorKey: 'deletedAt',
            header: 'Deleted At',
            cell: ({ renderedCellValue }) => new Date(renderedCellValue).toLocaleDateString(),
        });
    }
    return config;
}