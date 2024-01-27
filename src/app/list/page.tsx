import { FC } from 'react';
import ShoppingList from '@/Components/Ui/ShoppingList';
import AddShoppingList from '@/Components/Forms/AddShoppingList';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div>
        <ShoppingList />
        <AddShoppingList />
    </div>
  )
};

export default page;