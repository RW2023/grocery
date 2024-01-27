import Heading from '@/Components/Ui/Heading';
import { FC } from 'react';
import InventoryListDisplay from '@/Components/Ui/InventoryListDisplay';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (<div>
    <Heading title="Inventory Management" />
    <InventoryListDisplay />
  </div>);
};

export default page;