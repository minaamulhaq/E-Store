"use client"
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import Media from '@/components/Application/Admin/Media'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import { ButtonLoading } from '@/components/Application/ButtonLoading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import useDeleteMutation from '@/hooks/useDeleteMutation'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
const breadCrumData = [
    { href: "/dashboard", label: "Home" },
    { href: "/admin/media", label: "Media" },
]

const page = () => {

    const queryClient = useQueryClient();
    const seachParams = useSearchParams();
    const [deleteType, setDeleteType] = useState('SD'); // SD - Show Deleted, TD - Trash Deleted
    const [selectAll, setSelectAll] = useState(false);
    const fetchMedia = async (page, deleteType) => {

        const { data: res } = await axios.get(`/api/media?page=${page}&limit=10&deleteType=${deleteType}`);

        return res;
    }

    useEffect(() => {
        const trashof = seachParams.get('trashof');
        if (trashof) {
            setDeleteType('PD'); // PD - Permanent Deleted
        } else {
            setDeleteType('SD'); // SD - SOFT Deleted
        }
    }, [seachParams])
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['media', deleteType], // You can change 'SD' to 'TD' to fetch trashed media
        queryFn: async ({ pageParam = 0 }) => fetchMedia(pageParam, deleteType),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length;
            return lastPage.data.hasMore ? nextPage : undefined;
        }
    })


    console.log(data);

    const [selectedMedia, setSelectedMedia] = useState([]);
    const deleteMutation = useDeleteMutation('media', '/api/media/delete');
    const handleDelete = (selectedMedia, deleteType) => {

        let c = true;
        if (deleteType === 'PD') {
            c = confirm("Are you sure you want to permanently delete the selected media? This action cannot be undone.");
        }
        if (c) {
            deleteMutation.mutate({ id: selectedMedia, deleteType });

        }
        setSelectedMedia([]);
        setSelectAll(false);
    }
    const handleSelectAll = () => {
        setSelectAll(!selectAll);

    }

    useEffect(() => {
        if (selectAll) {
            const allMedia = data?.pages.flatMap(page => page.data.media.map(item => item._id));
            setSelectedMedia(allMedia);
            console.log(allMedia);
        } else {
            setSelectedMedia([]);
        }
    }, [selectAll])
    //console.log(data?.pages.flatMap(page => page.data.media.map(item => item._id)));
    return (
        <div>
            <BreadCrumb breadCrumData={breadCrumData} />
            <Card className="rounded shadow-sm py-0">
                <CardHeader className="pt-3 py-2 px-4 border-b [.border-b]:pb-2">
                    <div className='flex justify-between items-center'>
                        <h1 className='text-xl font-semibold uppercase'>
                            {deleteType === 'SD' ? 'Media Library' : 'Trash Media Library'}
                        </h1>
                        <div className='flex items-center'>

                            {deleteType === 'SD' && <UploadMedia queryClient={queryClient} isMultipale={true} />}
                            <div>
                                {deleteType === 'SD' ?
                                    <Button className="cursor-pointer ml-2" type="button" variant="destructive" >
                                        <Link href="/admin/media?trashof=media">Trash</Link>
                                    </Button>
                                    :
                                    <Button className={`ml-2 cursor-pointer`}>
                                        <Link href="/admin/media">Back To Media</Link>
                                    </Button>
                                }
                            </div>


                        </div>
                    </div>
                </CardHeader >
                <CardContent className="pb-2">
                    {selectedMedia.length > 0 &&
                        <div className='py-2 px-3 bg-violet-200 dark:bg-gray-400 mb-2 rounded flex justify-between items-center'>
                            <Label>
                                <Checkbox
                                    checked={selectAll}
                                    onCheckedChange={handleSelectAll}
                                    className={`border-primary`}
                                />
                                Select All
                            </Label>
                            <div className='flex gap-2'>
                                {deleteType === 'SD' ?
                                    <Button className="cursor-pointer" variant="destructive" onClick={() => handleDelete(selectedMedia, deleteType)}>Move to Trash</Button>
                                    :
                                    <>
                                        <Button className="cursor-pointer bg-green-500 hover:bg-green-600" onClick={() => handleDelete(selectedMedia, "RSD")}> Restore</Button>
                                        <Button className="cursor-pointer" variant="destructive" onClick={() => handleDelete(selectedMedia, deleteType)}>Delete Permanently</Button>
                                    </>
                                }
                            </div>
                        </div>
                    }



                    {status === "pending" ?
                        <div>
                            <p>Loading...</p>
                        </div>
                        :
                        status === "error" ?
                            <div className='text-red-500 text-sm'>
                                <p>{error.message}</p>
                            </div>
                            :
                            <>
                                {data?.pages.flatMap(page => page.data.media.map(item => item._id)).length === 0 && <div className='text-center text-gray-500 mb-2'> Data not Found</div>}
                                <div className='grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-3 gap-2 mb-4'>
                                    {data.pages.map((page, pageIndex) => (
                                        <React.Fragment key={pageIndex}>
                                            {page.data?.media.map((mediaItem) => (
                                                <Media key={mediaItem._id}
                                                    media={mediaItem}
                                                    setSelectedMedia={setSelectedMedia}
                                                    selectedMedia={selectedMedia}
                                                    deleteType={deleteType}
                                                    handleDelete={handleDelete}
                                                />
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                    }
                    {hasNextPage &&
                        <ButtonLoading className={`cursor-pointer`} type="button" loading={isFetching} text="Load More" onClick={() => fetchNextPage()} />
                    }

                </CardContent>
            </Card >
        </div >
    )
}

export default page
