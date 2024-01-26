import { FC } from 'react';
import Heading from '@/Components/Ui/Heading';
import AddGroceryItem from '@/Components/Forms/AddGroceryItem';
import GroceryListDisplay from '@/Components/Ui/GroceryListDisplay';
import UpdateGroceryItem from '@/Components/Forms/UpdateGroceryItem';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-background'>
            <Heading title='DevDash' />
            <GroceryListDisplay />
            <AddGroceryItem />
            <UpdateGroceryItem />
        </div>
    );
};

export default page;