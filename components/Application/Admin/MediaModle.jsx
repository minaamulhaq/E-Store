'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import loading from '@/public/assets/images/loading.svg'

import ModleMediaBlock from './ModleMediaBlock'
import { showToast } from '@/lib/showToast'

const MediaModle = ({ open, setOpen, selectedMedia, setSelectedMedia, isMultiple }) => {
    const [previouslySelectedMedia, setPreviouslySelectedMedia] = useState([]);
    const handleClear = () => {
        setSelectedMedia([]);
        showToast('success', 'Cleared all selected media items.');
        setPreviouslySelectedMedia([]);
        setOpen(false);
    }
    const handleClose = () => {
        // setPreviouslySelectedMedia(selectedMedia);
        setSelectedMedia(previouslySelectedMedia);
        setOpen(false);
    }
    const handleSelect = () => {
        if (selectedMedia.length === 0) {
            return showToast('error', 'Please select at least one media item.');
        }
        setPreviouslySelectedMedia(selectedMedia);
        setOpen(false);
    }
    const fetchMedia = async (page) => {

        const { data: res } = await axios.get(`/api/media?page=${page}&limit=18&deleteType=SD`);

        return res;
    }

    const {
        data,
        error,
        isError,
        isPending,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['mediaModle'],
        queryFn: async ({ pageParam }) => fetchMedia(pageParam),
        initialPageParam: 0,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length;
            return lastPage?.data.hasMore ? nextPage : undefined;
        }
    })




    return (
        <Dialog
            open={open}
            onOpenChange={() => setOpen(!open)}
        >
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className={`sm:max-w-[80%] h-screen p-0 py-10 bg-transparent border-0 shadow-none`}
            >
                <DialogDescription className="hidden"></DialogDescription>
                <div className='h-[90vh] bg-white dark:bg-gray-800 p-3 rounded shadow'>
                    <DialogHeader className='h-8 border-b'>
                        <DialogTitle className='text-center'>Media Slection</DialogTitle>
                    </DialogHeader>

                    <div className='h-[calc(100%-75px)] py-3 overflow-y-auto'>

                        {isPending ? (
                            <div className='size-full flex justify-center items-center'>
                                <Image src={loading} alt="loading" width={80} height={80} />

                            </div>)
                            :
                            isError ? (
                                <> <span className='text-red-500'> Error:  {error.message}</span></>
                            ) : (
                                <div className='grid lg:grid-cols-6 grid-cols-3 gap-3'>
                                    {data.pages.map((page, pageIndex) => (
                                        <React.Fragment key={pageIndex}>
                                            {page.data?.media.map((mediaItem) => (
                                                <ModleMediaBlock
                                                    key={mediaItem._id}
                                                    media={mediaItem}
                                                    setSelectedMedia={setSelectedMedia}
                                                    selectedMedia={selectedMedia}
                                                    isMultiple={isMultiple}
                                                />
                                            ))}

                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        <div className='mt-5'>
                            {hasNextPage && (
                                <div className='flex justify-center mb-3'>
                                    <Button

                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                        className={"cursor-pointer"}
                                    >
                                        {isFetchingNextPage ? "Loading..." : "Load More"}
                                    </Button>
                                </div>
                            )}



                        </div>

                    </div>


                    <div className='h-10 pt-3 border-t justify-between flex items-center'>

                        <div>
                            <Button className={`cursor-pointer`} variant={`destructive`} type='button'
                                onClick={handleClear} >
                                Clear All
                            </Button>

                        </div>

                        <div className='flex gap-3'>
                            <Button className={`cursor-pointer`} variant={`secondary`} type='button'
                                onClick={handleClose} >
                                Close
                            </Button>
                            <Button className={`cursor-pointer`} type='button'
                                onClick={handleSelect} >
                                Select
                            </Button>
                        </div>

                    </div>



                </div>

            </DialogContent>
        </Dialog>
    )
}

export default MediaModle
