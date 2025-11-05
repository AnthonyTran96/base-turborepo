import { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* <Header /> */}
      <div className="flex flex-1 flex-col px-24">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
