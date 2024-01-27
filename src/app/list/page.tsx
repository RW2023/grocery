import { FC } from 'react';
import ShoppingList from '@/Components/Ui/ShoppingList';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div>
        <ShoppingList />
    </div>
  )
};

export default page;