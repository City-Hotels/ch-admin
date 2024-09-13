import React from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import SubscriptionTable from '@/components/Subscribtions/SubscriptionTable';


const page = () => {
  return (
    <DefaultLayout>
        <SubscriptionTable Limit={5} Filter={{}} />
    </DefaultLayout>
  )
}

export default page