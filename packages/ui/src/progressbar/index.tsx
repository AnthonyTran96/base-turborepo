import { TextBase } from '../text';
import { IconCheck } from './images';

export enum TypeProgressBar {
  LINE = 'line',
  STEP = 'step'
}

interface ProgressBarProps {
  styles?: React.CSSProperties;
  className?: string;
  stepTitles?: string[];
  currentStep?: number;
  type?: TypeProgressBar;
}

const ProgressBar = (props: ProgressBarProps) => {
  const {
    styles = {},
    className = '',
    stepTitles = ['step 1', 'step 2', 'step 3', 'step 4'],
    currentStep = 3,
    type = TypeProgressBar.STEP
  } = props;

  return type !== TypeProgressBar.LINE ? (
    <div className={`flex flex-row justify-between gap-8 ${className}`} style={{ ...styles }}>
      {stepTitles.map((title, index) => {
        const step = index + 1;
        return (
          <div
            key={title + step}
            className={`progressItem text-14 relative flex flex-row gap-8 font-normal ${index !== 0 && 'flex-1'} ${step < currentStep ? 'progressFinished' : 'progressInactive'} ${step === currentStep && 'progressActive'} `}
          >
            {index !== 0 && (
              <div className="border-color-600 my-auto h-[2px] flex-1 rounded-[1px] border border-solid" />
            )}

            <div className="mobile:flex-col flex flex-row gap-8">
              <div className="progressIcon mobile:mx-auto">
                {step < currentStep ? <IconCheck /> : step}
              </div>
              <TextBase text={title} />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div
      className="border-color-50 flex h-8 flex-row overflow-hidden rounded-[16px] border border-solid"
      style={{ ...styles }}
    >
      {stepTitles.map((_, index) => {
        const step = index + 1;
        return (
          <div
            key={step}
            className={`flex-1 ${step < currentStep ? 'bg-secondary-500' : 'bg-color-300'} ${step === currentStep && 'bg-secondary-300'} `}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
