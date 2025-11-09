import content from '@/utils/content';
import BackPage from '@repo/ui/backpage';
import { TextBase } from '@repo/ui/text';
import { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const ChangePasswordWrapper = ({ children }: Props) => {
  return (
    <div className="rounded-radius-xl border-weight-l border-color-50 border-opacity-xl bg-color-50 bg-opacity-xl mx-auto mt-[100px] h-fit w-full max-w-[437px] translate-x-[-200px] p-36">
      <div className="mb-20 flex items-center justify-between">
        <BackPage />
        <TextBase preset="h4" text={content.login_screen.change_password} />
      </div>
      {children}
    </div>
  );
};

export default ChangePasswordWrapper;
