export enum TYPE_STATUS {
  DEFAULT = 'default',
  SUCCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
  BRANDING = 'branding',
  CONFIRM = 'confirm',
  DISABLED = 'disabled'
}

export enum KIND_STATUS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost'
}

interface StatusProps {
  type?: TYPE_STATUS;
  kind?: KIND_STATUS;
  content: React.ReactNode;
  wrapStyle?: string;
  contentStyle?: string;
}
const Status = (props: StatusProps) => {
  const {
    type = TYPE_STATUS.DEFAULT,
    kind = KIND_STATUS.PRIMARY,
    content,
    wrapStyle,
    contentStyle
  } = props;
  return (
    <div className={`status-${kind} text-10 box-border w-fit font-medium ${wrapStyle}`}>
      <div
        className={`status-${type} rounded-[4px] border border-solid px-8 py-[2px] ${contentStyle}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Status;
