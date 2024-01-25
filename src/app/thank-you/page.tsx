import { getPayloadClient } from '@/get-payload';
import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation';



const page = async () => {

    const nextCookies = cookies()

    const {user} = await getServerSideUser(nextCookies)
    const payload = await getPayloadClient()

    const {docs: orders} = await payload.find({
        collection: 'orders',
        depth: 2,
        
    })
    const order = orders[0]

    if (!order) return notFound()


    const orderUserId = typeof order.user === 'string' ? order.user : order.user.id 
    console.log(user?.id)

    if (orderUserId !== user?.id ){
        return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
    }


    return (
        <main className='relative lg:min-h-full'>
            <div className=' hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
                <Image
                fill
                src='/checkout-thank-you.jpg'
                className='h-full w-full object-cover'
                alt='thank you for your order' />
            </div>

            <div>
                <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-32'>
                    <div className='lg:col-start-2'>
                        <p className='text-sm font-medium text-blue-500'>Order successful</p>
                        <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5-xl'>Thanks for ordering!</h1>

                        {order._isPaid ? <p className='mt-2 text-base text-muted-foreground'>Payment successful</p>
                         : (
                            <p></p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;