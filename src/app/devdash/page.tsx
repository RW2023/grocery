import { FC } from 'react';
import Heading from '@/Components/Ui/Heading';
import AddGroceryItem from '@/Components/Forms/AddGroceryItem';
import GroceryListDisplay from '@/Components/Ui/GroceryListDisplay';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-background'>
            <Heading title='DevDash' />
            <AddGroceryItem />
            <GroceryListDisplay />
        </div>
    );
};

export default page;