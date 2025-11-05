'use client';
import { useGetUser } from '@/data/user/selectors';
import { TextBase } from '@repo/ui/text';

const NameText = () => {
  const { name } = useGetUser();

  return <TextBase text={'hello ' + name} className="text-20 text-error-500" />;
};

export default NameText;
