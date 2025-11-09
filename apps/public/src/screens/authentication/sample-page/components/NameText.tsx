'use client';
import { useSession } from '@/hooks/useSession';
import { TextBase } from '@repo/ui/text';
import { DebugUtils } from '@repo/utils/debug-utils';

const NameText = () => {
  const { session } = useSession();
  DebugUtils.logS('test name text client render');

  return <TextBase text={'hello ' + session?.name} className="text-20 text-error-500" />;
};

export default NameText;
