import {
    Table,
    TableBody,
    TableCaption,
    TableCell,

    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

export function LatestOrders() {
    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead >Order Id</TableHead>
                    <TableHead>Payment Id</TableHead>
                    <TableHead>Items </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>PID001</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
