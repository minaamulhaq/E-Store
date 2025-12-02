import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import searchData from "@/lib/search";
import Fuse from "fuse.js";
import Link from "next/link";
import { useEffect, useState } from "react";
const Options = {
    keys: ['label', 'description', 'keywords'],
    threshold: 0.3,
}
const DailogModel = ({ open, setOpen }) => {
    const [Query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const fuse = new Fuse(searchData, Options);

    useEffect(() => {

        if (Query.trim() === "") {
            setResult([]);
        }
        const res = fuse.search(Query);
        setResult(res.map(({ item }) => item));
        console.log(result);
        //setResult(res);

        console.log(res);
    }, [Query])
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quick Search</DialogTitle>
                    <DialogDescription>

                        Find and navigate to any admin section section, Type a key to get started.

                    </DialogDescription>
                </DialogHeader>

                <Input
                    autoFocus
                    placeholder='Type to search...'
                    className={`w-full mt-4`}
                    value={Query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <ul className="mt-4 max-h-60 overflow-y-auto">
                    {result.length > 0 && result.map((item, index) => (
                        <li key={index} >
                            <Link href={item.url}
                                onClick={() => { setOpen(false) }}
                                className="block rounded w-full py-2 px-3 hover:bg-muted"
                            >
                                <h4 className="font-medium">
                                    {item.label}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </Link>
                        </li>
                    ))}
                    {Query && result.length === 0 && (
                        <li className="py-2 px-3 text-sm text-muted-foreground text-center mt-4">
                            No results found.
                        </li>
                    )}
                </ul>
            </DialogContent>
        </Dialog>
    )
}

export default DailogModel
