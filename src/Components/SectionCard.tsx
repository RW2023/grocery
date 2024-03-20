import { FC } from 'react';

import Link from 'next/link';
import SubHeading from './Ui/SubHeading';

interface Props {
    content: JSX.Element;
    headingTitle: string;
    href?: string;
    buttonText?: string;
}

const SectionCard: FC<Props> = ({content, headingTitle, href, buttonText}): JSX.Element => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <SubHeading title={headingTitle} />
        {content}
        <div className="card-actions justify-end">
        {href && (
            <Link href={href}>
                <button type="button" className="btn btn-primary">
                   {buttonText}
                </button>
            </Link>
        )}
        </div>
      </div>
    </div>
  );
};

export default SectionCard;