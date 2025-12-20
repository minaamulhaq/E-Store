import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import UseImage from "@/public/assets/images/img-placeholder.webp";
import { Rating } from '@mui/material';

// Initialize the relativeTime plugin
dayjs.extend(relativeTime);

const Reviewlist = ({ review }) => {
    return (
        <div key={review._id} className="border-b p-4 mb-2 hover:bg-gray-50 transition-colors">
            {/* Header: Avatar, Name, Rating, and Time */}
            <div className="flex items-start gap-4 mb-3">
                <Avatar className="h-11 w-11 border">
                    <AvatarImage
                        src={review.avatar || UseImage.src}
                        alt={review.reviewedBy || "User"}
                    />
                    <AvatarFallback>{review.reviewedBy?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                            {/* User Name */}
                            <h4 className="font-bold text-gray-900 leading-tight">
                                {review.reviewedBy}
                            </h4>
                            {/* Review Title */}
                            <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                {review.title}
                            </p>
                        </div>

                        {/* Rating and Relative Time */}
                        <div className="flex flex-col items-start sm:items-end gap-1">
                            <Rating value={review.rating} readOnly size="small" />
                            <span className="text-xs text-gray-400 font-medium">
                                {dayjs(review.createdAt).fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Review Content */}
            <div className="pl-0 sm:pl-[60px]">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {review.review}
                </p>
            </div>
        </div>
    );
};

export default Reviewlist;