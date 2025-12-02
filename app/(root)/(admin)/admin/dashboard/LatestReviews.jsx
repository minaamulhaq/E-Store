import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaStar } from "react-icons/fa";
import UseImage from "@/public/assets/images/img-placeholder.webp"


export function LatestReviews() {
    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead >Product</TableHead>
                    <TableHead>Rating</TableHead>


                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TableRow key={index} >
                        <TableCell className="font-medium flex items-center ">
                            <Avatar>
                                <AvatarImage src={UseImage.src} alt="Product Image" />
                            </Avatar>
                            <span className="ml-2 line-clamp-3 block max-w-[120px]">Lorem ipsum dolor sit amet sgjh gj ihjh  hjk</span>
                        </TableCell>

                        <TableCell >
                            <div className="flex items-center">

                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                    <FaStar key={starIndex} className="text-yellow-500" />
                                ))}
                            </div>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
