'use client';
import { useGetUser } from '@/data/user/selectors';
import { TextBase } from '@repo/ui/text';
import { DebugUtils } from '@repo/utils/debug-utils';

const NameText = () => {
  const { name } = useGetUser();

  DebugUtils.logS('test name text client render');

  return <TextBase text={'hello ' + name} className="text-20 text-error-500" />;
};

export default NameText;
