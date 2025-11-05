'use client';

import { useGetUser } from '@/data/user/selectors';
import { TextBase } from '@repo/ui/text';

const SamplePagePage = () => {
  const user = useGetUser();
  return (
    <div className="h-screen w-screen">
      <TextBase text={'Hello ' + user.name} />
    </div>
  );
};

export default SamplePagePage;
