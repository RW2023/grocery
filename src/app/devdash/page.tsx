import { FC } from 'react';
import Heading from '@/Components/Ui/Heading';
import AddGroceryItem from '@/Components/Forms/AddGroceryItem';
import GroceryListDisplay from '@/Components/Ui/InventoryListDisplay';
import UpdateGroceryItem from '@/Components/Forms/UpdateGroceryItem';
import ManageGroceryItemForm from '@/Components/Forms/ManageInventory';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-background'>
            <Heading title='DevDash' />
            <GroceryListDisplay />
           <ManageGroceryItemForm />
        </div>
    );
};

export default page;