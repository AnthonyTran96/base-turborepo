import StyleProvider from '@/styles/StyleProvider';
import { SessionProvider } from '@/utils/session/SessionProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { DialogView } from '@repo/ui/dialog';
import Loader from '@repo/ui/loader';
import { ToastView } from '@repo/ui/toast';
import ConfigProvider from 'antd/es/config-provider';
import theme from 'antd/es/theme';
import { ReactElement } from 'react';

// ==============================|| PROVIDER WRAPPER  ||============================== //

const ProviderWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <StyleProvider loader={<Loader />}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              fontFamily: 'inherit'
            }
          }}
        >
          <SessionProvider>{children}</SessionProvider>
          <ToastView />
          <DialogView />
        </ConfigProvider>
      </AntdRegistry>
    </StyleProvider>
  );
};

export default ProviderWrapper;
