import { FC } from 'react';
import Heading from '@/Components/Ui/Heading';
import AddGroceryItem from '@/Components/Forms/AddGroceryItem';

interface Props {}

const page: FC<Props> = (): JSX.Element => {
    return (
        <div className='min-h-screen bg-background'>
            <Heading title='DevDash' />
            <AddGroceryItem />
        </div>
    );
};

export default page;