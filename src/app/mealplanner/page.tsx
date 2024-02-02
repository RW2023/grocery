import Calendar from '@/Components/Ui/Calendar';
import { FC } from 'react';

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div>
        <Calendar />
    </div>
  );
};

export default page;