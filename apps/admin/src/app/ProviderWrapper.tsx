import { AntdRegistry } from '@ant-design/nextjs-registry';
import { DialogView } from '@repo/ui/dialog';
import { ToastView } from '@repo/ui/toast';
import ConfigProvider from 'antd/es/config-provider';
import theme from 'antd/es/theme';
import { ReactElement } from 'react';

// ==============================|| PROVIDER WRAPPER  ||============================== //

const ProviderWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            fontFamily: 'inherit'
          }
        }}
      >
        {children}
      </ConfigProvider>
      <ToastView />
      <DialogView />
    </AntdRegistry>
  );
};

export default ProviderWrapper;
