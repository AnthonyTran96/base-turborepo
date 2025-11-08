'use client';

import ButtonBase from '@repo/ui/button';
import { showDialog, TYPE_ACTION, TYPE_MESSAGE } from '@repo/ui/dialog';
import { DebugUtils } from '@repo/utils/debug-utils';

const OpenDialog = () => {
  return (
    <>
      <ButtonBase
        type="ghost"
        customContent="open dialog "
        onClick={() => {
          DebugUtils.logS('alert notify test run in client');
          showDialog({
            title: 'alert notify',
            content: 'text:functions_in_development',
            type: TYPE_MESSAGE.ALERT,
            actions: [
              {
                title: 'text:close'
              }
            ]
          });
        }}
      />
      <ButtonBase
        type="primary"
        customContent="open dialog "
        onClick={() => {
          showDialog({
            title: 'alert notify',
            content: 'text:functions_in_development',
            type: TYPE_MESSAGE.ALERT,
            actions: [
              {
                title: 'text:close',
                iconLeftName: 'ICON_EDIT',
                iconRightName: 'ICON_EDIT'
              },
              {
                title: 'text:cancel',
                type: TYPE_ACTION.SECONDARY
              },
              {
                title: 'text:link',
                type: TYPE_ACTION.LINK
              }
            ]
          });
        }}
      />
    </>
  );
};

export default OpenDialog;
