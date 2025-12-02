"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import axios from "axios";
const UploadMedia = ({ isMultipale, queryClient }) => {
    const handleError = (err) => {
        console.log("Upload error:", err);
    }
    const handleQueuesEnd = async (result) => {

        console.log("All uploads complete! Here is the result:", result);
        const file = result?.info.files;
        const uploadFile = file.filter(f => f?.uploadInfo).map(file => ({
            asset_id: file?.uploadInfo?.asset_id,
            public_id: file?.uploadInfo?.public_id,
            path: file?.uploadInfo?.path,
            secure_url: file?.uploadInfo?.secure_url,
            thumbnail_url: file?.uploadInfo?.thumbnail_url,

        }))
        if (uploadFile.length > 0) {
            //console.log("Upload info:", uploadFile);
            try {
                const { data: response } = await axios.post("/api/media/create", uploadFile);
                if (!response.success) {
                    throw Error(response.message || "Failed to save media");
                }
                showToast("success", response.message || "Media saved successfully");
                queryClient.invalidateQueries(['media'])
            } catch (error) {
                showToast("error", error.message || "Failed to save media");
                console.error("Error saving media to the database:", error);
            }

        }
    }
    return (
        <div className="flex flex-col items-center gap-3 cursor-pointer">
            <CldUploadWidget
                signatureEndpoint={"/api/cloudinary-signature"}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onError={handleError}
                onQueuesEnd={handleQueuesEnd}
                options={{
                    sources: ['local', 'url', 'unsplash', 'google_drive'],
                    multiple: isMultipale,
                }}

            >
                {({ open }) => (
                    <Button
                        type="button"
                        onClick={() => open()}
                        className={`cursor-pointer`}
                    >
                        <FaPlus className="inline mr-2" />
                        Upload Media
                    </Button>
                )}
            </CldUploadWidget>


        </div >
    );
};

export default UploadMedia;
