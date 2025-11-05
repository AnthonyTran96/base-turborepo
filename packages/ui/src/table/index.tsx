import ICON_ARROW_LEFT from '@repo/ui/assets/svg/arrow-left.svg';
import type { AnyObject } from 'antd/es/_util/type';
import Skeleton from 'antd/es/skeleton';
import type { TableProps } from 'antd/es/table';
import Table from 'antd/es/table';
import type { TableLocale } from 'antd/es/table/interface';
import { forwardRef } from 'react';
import { TextBase } from '../text';

export interface AppTableProps extends Omit<TableProps<AnyObject>, 'bordered'> {
  rounded?: boolean;
  loading?: boolean;
  emptyText?: string;
  emptyComponent?: React.ReactNode;
}

const AppTable = (
  {
    loading,
    emptyText,
    emptyComponent,
    rounded = false,
    size = 'small',
    pagination = false,
    ...restProps
  }: AppTableProps,
  ref: Parameters<typeof Table>[0]['ref']
) => {
  const locale: TableLocale = {
    ...restProps.locale,
    emptyText: (
      <Skeleton active loading={loading} paragraph={{ rows: 4 }} title={false}>
        {emptyComponent || <TextBase text={emptyText || 'No Data'} />}
      </Skeleton>
    )
  };

  return (
    <Table
      ref={ref}
      size={size}
      data-rounded={rounded}
      pagination={
        pagination && {
          ...pagination,
          position: ['bottomCenter'],
          hideOnSinglePage: true,
          prevIcon: (
            <div className="ant-pagination-item-link">
              <ICON_ARROW_LEFT height={20} width={20} fill="rgb(var(--color-600))" />
            </div>
          ),
          nextIcon: (
            <div className="ant-pagination-item-link">
              <ICON_ARROW_LEFT height={20} width={20} fill="rgb(var(--color-600))" />
            </div>
          )
        }
      }
      locale={locale}
      {...restProps}
    />
  );
};

export default forwardRef(AppTable);
