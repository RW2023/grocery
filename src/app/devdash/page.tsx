//src/app/devdash/page.tsx
'use client';
import { FC } from 'react';
import Heading from '@/Components/Ui/Heading';
import GroceryListDisplay from '@/Components/Ui/InventoryListDisplay';
import ManageGroceryItemForm from '@/Components/Forms/ManageInventory';
import Logout from '@/Components/Ui/Logout';
import DetailedGroceryList from '@/Components/Ui/DetailedGroceryList';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-background'>
            <Heading title='DevDash' />
            <DetailedGroceryList />
           <ManageGroceryItemForm />
           <Logout />
        </div>
    );
};

export default page;