'use client';

import ButtonBase from '@repo/ui/button';
import { showToast, TYPE_TOAST } from '@repo/ui/toast';

const OpenToast = () => {
  return (
    <>
      <ButtonBase
        type="ghost"
        customContent="open toast"
        onClick={() => showToast({ type: TYPE_TOAST.SUCCESS, content: 'Show Success' })}
      />
      <ButtonBase
        type="primary"
        customContent="open toast"
        onClick={() => showToast({ type: TYPE_TOAST.ERROR2, content: 'Show Error' })}
      />
      <ButtonBase
        type="secondary"
        customContent="open toast"
        onClick={() => showToast({ type: TYPE_TOAST.WARNING, content: 'Show Warning' })}
      />
    </>
  );
};

export default OpenToast;
