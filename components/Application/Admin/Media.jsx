import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { showToast } from "@/lib/showToast";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { LuTrash } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";

const Media = ({ media, deleteType, handleDelete, selectedMedia, setSelectedMedia }) => {
    const handleChecked = (checked) => {
        let newSelectedMedia = [];
        if (checked) {
            newSelectedMedia = [...selectedMedia, media._id];
        } else {
            newSelectedMedia = selectedMedia.filter((id) => id !== media._id);
        }
        setSelectedMedia(newSelectedMedia);
    };

    const handleCopyLink = async (url) => {
        await navigator.clipboard.writeText(url);
        showToast("success", "Link copied to clipboard");
    };

    return (
        <div className="border border-gray-200 dark:border-gray-800 relative group overflow-hidden rounded">
            <div className="top-2 left-2 absolute z-20">
                <Checkbox
                    checked={selectedMedia.includes(media._id)}
                    onCheckedChange={handleChecked}
                    className="cursor-pointer border-primary"
                />
            </div>

            <div className="absolute top-2 right-2 z-20">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-full bg-black/50">
                            <BsThreeDotsVertical color="#fff" />
                        </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-white dark:bg-gray-700 rounded" align="start">
                        {deleteType === "SD" && (
                            <>
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href={`media/edit/${media._id}`}>
                                        <MdOutlineEdit />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleCopyLink(media.secure_url)}
                                    className="cursor-pointer"
                                >
                                    <IoIosLink />
                                    Copy Link
                                </DropdownMenuItem>
                            </>
                        )}

                        <DropdownMenuItem
                            onClick={() => handleDelete([media._id], deleteType)}
                            className="cursor-pointer">
                            <LuTrash color="red" />
                            {deleteType === "SD" ? "Move to Trash" : "Delete Permanently"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="w-full h-full absolute z-10 transition-all duration-150 ease-in group-hover:bg-black/30"></div>

            <div>
                <Image
                    src={media.secure_url}
                    alt={media?.original_filename || "Media Image"}
                    height={200}
                    width={200}
                    className="w-full object-cover sm:h-[200px] h-[150px]"
                />
            </div>
        </div>
    );
};

export default Media;
