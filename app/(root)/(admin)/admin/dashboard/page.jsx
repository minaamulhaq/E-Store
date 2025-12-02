import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'
import CountOverview from './CountOverview'
import QuickAdd from './QuickAdd'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SalesOverview } from './SalesOverview'
import { OrderStatus } from './OrderStatus'
import { LatestOrders } from './LatestOrder'
import { LatestReviews } from './LatestReviews'

const AdminDashboard = () => {
    return (
        <div className='w-full'>
            <CountOverview />
            <QuickAdd />
            <div className='mt-8 flex lg:flex-nowrap flex-wrap gap-4'>
                <Card className={`rounded-lg shadow-lg w-full lg:w-[65%] p-0`}>
                    <CardHeader className={`py-2 border-b [.border-b]:pb-0`}>
                        <div className='flex items-center justify-between'>
                            <h4 className='font-bold text-lg'>Sales Overview</h4>
                            <Button type='button' >
                                View Report
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                        <SalesOverview />
                    </CardContent>
                </Card>

                <Card className={`rounded-lg shadow-lg lg:w-[35%] w-full p-0`}>
                    <CardHeader className={`py-2 border-b [.border-b]:pb-0`}>
                        <div className='flex items-center justify-between'>
                            <h4 className='font-bold text-lg'>Order Status</h4>
                            <Button type='button' >
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0'>
                        <OrderStatus />
                    </CardContent>
                </Card>

            </div>




            <div className='mt-8 flex lg:flex-nowrap flex-wrap gap-4'>
                <Card className={`rounded-lg shadow-lg w-full lg:w-[65%] p-0 block`}>
                    <CardHeader className={`py-2 border-b [.border-b]:pb-0`}>
                        <div className='flex items-center justify-between'>
                            <h4 className='font-bold text-lg'>Latest Orders</h4>
                            <Button type='button' >
                                View Report
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0 lg:h-[300px] overflow-y-auto'>
                        <LatestOrders />
                    </CardContent>
                </Card>
                <Card className={`rounded-lg shadow-lg lg:w-[35%] w-full p-0 block`}>
                    <CardHeader className={`py-2 border-b [.border-b]:pb-0`}>
                        <div className='flex items-center justify-between'>
                            <h4 className='font-bold text-lg'>Latest Reviews</h4>
                            <Button type='button' >
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className='pt-0 lg:h-[300px] overflow-y-auto'>
                        {/* <LatestReviews /> */}
                        <LatestReviews />
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default AdminDashboard
