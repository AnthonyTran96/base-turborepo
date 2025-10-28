import { ROUTES } from '@/config/routes';
import content from '@/utils/content';
import { TextBase } from '@repo/ui/text';
import Link from 'next/link';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const LoginWrapper = ({ children }: Props) => {
  return (
    <div className="rounded-radius-xl border-weight-l border-color-50 border-opacity-xl bg-color-50 bg-opacity-xl mx-auto mt-[100px] h-fit w-full max-w-[437px] translate-x-[-200px] p-36">
      <div className="mb-20 flex items-center justify-between">
        <TextBase preset="h4" text={content.login_screen.login} />
        <Link href={ROUTES.CHANGE_PASSWORD}>
          <TextBase
            preset="body1"
            className="!text-link-500"
            text={content.login_screen.change_password}
          />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default LoginWrapper;
