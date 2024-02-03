import { FC } from 'react';

interface Props {}

const Pending: FC<Props> = (props): JSX.Element => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-3xl">
          <span className="m-2">
            <span className="loading loading-bars loading-lg min-"></span>
          </span>{' '}
       checking database ....?
        </p>
      </div>
    </div>
  );
};

export default Pending;