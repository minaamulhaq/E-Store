import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import React from 'react'

const ModleMediaBlock = ({ media, selectedMedia, setSelectedMedia, isMultiple }) => {
    const handleCheckedChange = (checked) => {
        let newSlectedMedia = [];
        const isAlreadySelected = selectedMedia.find((item) => item._id === media._id);
        if (isMultiple) {
            // If multiple selection is allowed
            if (isAlreadySelected) {
                newSlectedMedia = selectedMedia.filter((item) => item._id !== media._id);
                setSelectedMedia(newSlectedMedia);
            } else {
                newSlectedMedia = [...selectedMedia, {
                    _id: media._id,
                    url: media.secure_url,
                    filename: media.filename,
                    alt: media.alt || '',
                }];
                setSelectedMedia(newSlectedMedia);
            }

        } else {
            // If single selection, replace the selected media
            if (isAlreadySelected) {
                setSelectedMedia([]);
            } else {
                setSelectedMedia([{
                    _id: media._id,
                    url: media.secure_url,
                    filename: media.filename,
                    alt: media.alt || '',
                }]);
            }
        }
    }
    return (
        <label htmlFor={media._id} className={`cursor-pointer border border-gray-200  p-2 relative 
        group rounded overflow-hidden dark:border-gray-800'}`}>
            <div className='top-2 left-2 absolute z-20'>
                <Checkbox
                    className={`cursor-pointer border-primary`}
                    id={media._id}
                    checked={!!selectedMedia.find((item) => item._id === media._id)}
                    onCheckedChange={handleCheckedChange}
                />

            </div>
            <div className='size-full relative'>
                <Image
                    src={media.secure_url}
                    alt={media.filename || "media image"}
                    width={300}
                    height={300}
                    className={`object-cover md:h-[150px] h-[100px]`}
                />
            </div>
        </label>
    )
}

export default ModleMediaBlock
