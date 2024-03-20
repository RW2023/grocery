//src/app/devdash/page.tsx

import { FC } from 'react';
import Heading from '@/Components/Ui/Heading';
import ManageGroceryItemForm from '@/Components/Forms/ManageInventory';
import DetailedGroceryList from '@/Components/Ui/DetailedGroceryList';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-background'>
            <Heading title='DevDash' />
            <DetailedGroceryList />
           <ManageGroceryItemForm />
        </div>
    );
};

export default page;