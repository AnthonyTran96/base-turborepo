import { ROUTES } from '@/config/routes';
import ERROR_500 from '@repo/ui/assets/images/maintenance/img-error-500.svg';
import ButtonBase from '@repo/ui/button';
import { TextBase } from '@repo/ui/text';
import Image from 'next/image';
import Link from 'next/link';

const Error500Page = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="mb-16 w-[300px]">
          <Image
            src={ERROR_500}
            alt="ERROR_500"
            height={370}
            width={396}
            className="h-auto max-w-full"
          />
        </div>
        <TextBase
          text="Internal Server Error"
          preset="h2"
          className="!text-color-800 mt-12 px-4 text-center"
        />
        <TextBase
          text="The page you are looking was moved, removed, renamed, or might never exist!"
          preset="body1"
          className="!text-color-700 px-4 text-center"
        />
        <Link href={ROUTES.ROOT} className="mt-12">
          <ButtonBase text="Back To Home" type="primary" />
        </Link>
      </div>
    </div>
  );
};

export default Error500Page;
