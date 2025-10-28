import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="size-full bg-cover">
      <div className="flex size-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
