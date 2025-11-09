import ButtonBase from '@repo/ui/button';
import AppCheckbox from '@repo/ui/checkbox';
import { AppDatePicker } from '@repo/ui/date-picker';
import { IconSvgLocal } from '@repo/ui/icon-vec-local';
import InfoBox from '@repo/ui/infobox';
import LinearProgress from '@repo/ui/loader/linear-progress';
import ProgressBar, { TypeProgressBar } from '@repo/ui/progressbar';
import AppRadio from '@repo/ui/radio';
import Status, { KIND_STATUS, TYPE_STATUS } from '@repo/ui/status';
import { AppTextField } from '@repo/ui/text-field';
import { DebugUtils } from '@repo/utils/debug-utils';
import NameText from './components/NameText';
import OpenDialog from './components/OpenDialog';
import OpenToast from './components/OpenToast';
import UserInfo from './components/UserInfo';

const SamplePagePage = () => {
  DebugUtils.logS('test sample page server render');
  return (
    <section className="size-full p-16">
      <NameText />
      <LinearProgress />
      <div className="title3">- Button Component</div>
      <div>
        {/* demo khi có customContent */}
        <ButtonBase type="primary" customContent="Primary" className="m-4" />
        <ButtonBase type="primary" disabled customContent="Disabled Primary" className="m-4" />

        <ButtonBase type="secondary" customContent="Secondary" className="m-4" />
        <ButtonBase type="secondary" disabled customContent="Disabled Secondary" className="m-4" />

        <ButtonBase type="ghost" customContent="Ghost" className="m-4" />
        <ButtonBase type="ghost" customContent="Disabled Ghost" disabled className="m-4" />

        <ButtonBase type="whiteGhost" customContent="White Ghost" className="m-4" />
        <ButtonBase
          type="whiteGhost"
          customContent="Disabled WhiteGhost"
          disabled
          className="m-4"
        />

        <ButtonBase
          type="primary"
          customContent="Primary with Icon"
          leftIcon="ICON_EDIT"
          rightIcon="ICON_ARROW_CIRCLE_UP"
          className="m-4"
        />
        <ButtonBase
          type="primary"
          customContent="Primary with Icon"
          leftIcon="ICON_EDIT"
          className="m-4"
        />
        <ButtonBase type="primary" leftIcon="ICON_EDIT" />
      </div>
      <div className="title3">- Typography</div>
      <div className="mt-4 flex">
        <div className="mr-8">
          <div className="h1">h1</div>
          <div className="h2">h2</div>
          <div className="h3">h3</div>
          <div className="h4">h4</div>
        </div>
        <div className="mr-8">
          <div className="title1">title1</div>
          <div className="title2">title2</div>
          <div className="title3">title3</div>
          <div className="title4">title4</div>
          <div className="title5">title5</div>
        </div>
        <div className="mr-8">
          <div className="sub-title1">sub-title1</div>
          <div className="sub-title2">sub-title2</div>
          <div className="sub-title3">sub-title3</div>
          <div className="sub-title4">sub-title4</div>
        </div>
        <div className="mr-8">
          <div className="body1">body1</div>
          <div className="body2">body2</div>
          <div className="body3">body3</div>
        </div>
        <div>
          <div className="caption1">caption1</div>
          <div className="caption2">caption2</div>
          <div className="caption3">caption3</div>
        </div>
      </div>
      <IconSvgLocal name="ICON_EDIT" width={100} height={100} />
      <OpenDialog />
      <OpenToast />
      <ProgressBar
        stepTitles={['buoc 1', 'buoc 2', 'buoc 3', 'buoc 4', 'buoc 5']}
        className="py-12"
      />
      <ProgressBar
        stepTitles={['buoc 1', 'buoc 2', 'buoc 3', 'buoc 4', 'buoc 5']}
        currentStep={4}
        type={TypeProgressBar.LINE}
      />
      <UserInfo />
      <InfoBox title="Thông" caption="text:copyright" icon="ICON_CHECK" className="w-[400px]" />
      <Status type={TYPE_STATUS.CONFIRM} content="23456" />
      <Status kind={KIND_STATUS.SECONDARY} type={TYPE_STATUS.CONFIRM} content="23456" />
      <Status kind={KIND_STATUS.GHOST} type={TYPE_STATUS.CONFIRM} content="23456" />
      <AppCheckbox
        direction="column"
        block
        options={[
          {
            label: <InfoBox title="A" caption="A" icon="ICON_ARROW_CIRCLE_UP" />,
            value: 'A'
          },
          {
            label: <InfoBox title="B" caption="B" icon="ICON_ARROW_CIRCLE_UP" />,
            value: 'B'
          }
        ]}
      />
      <AppCheckbox
        options={[
          {
            label: 'A',
            value: 'A'
          },
          {
            label: 'B',
            value: 'B'
          }
        ]}
      />
      <div className="my-12">
        <AppTextField />
        <AppTextField type="password" />
      </div>
      <div className="my-12">
        <AppDatePicker />
      </div>
      <div className="my-12">
        <AppRadio
          options={[
            { value: 'Test1', label: 'Test1' },
            { value: 'Test2', label: 'Test2' }
          ]}
        />
      </div>
    </section>
  );
};
export default SamplePagePage;
