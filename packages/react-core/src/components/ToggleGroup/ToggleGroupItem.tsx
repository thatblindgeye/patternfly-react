import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/ToggleGroup/toggle-group';
import { ToggleGroupItemVariant, ToggleGroupItemElement } from './ToggleGroupItemElement';

export interface ToggleGroupItemProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
  /** Text rendered inside the toggle group item */
  text?: React.ReactNode;
  /** Icon rendered inside the toggle group item */
  icon?: React.ReactNode;
  /** Sets position of the icon when text is also passed in */
  iconPosition?: 'start' | 'end';
  /** Additional classes added to the toggle group item */
  className?: string;
  /** Flag indicating if the toggle group item is disabled */
  isDisabled?: boolean;
  /** Flag indicating if the toggle group item is selected */
  isSelected?: boolean;
  /** required when icon is used with no supporting text */
  'aria-label'?: string;
  /** Optional id for the button within the toggle group item */
  buttonId?: string;
  /** A callback for when the toggle group item selection changes. */
  onChange?: (event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent, selected: boolean) => void;
}

export const ToggleGroupItem: React.FunctionComponent<ToggleGroupItemProps> = ({
  text,
  icon,
  iconPosition = 'start',
  className,
  isDisabled = false,
  isSelected = false,
  'aria-label': ariaLabel,
  onChange = () => {},
  buttonId,
  ...props
}: ToggleGroupItemProps) => {
  const handleChange = (event: any): void => {
    onChange(event, !isSelected);
  };

  if (!ariaLabel && icon && !text) {
    /* eslint-disable no-console */
    console.warn('An accessible aria-label is required when using the toggle group item icon variant.');
  }

  const toggleGroupIcon = <ToggleGroupItemElement variant={ToggleGroupItemVariant.icon}>{icon}</ToggleGroupItemElement>;

  return (
    <div className={css(styles.toggleGroupItem, className)} {...props}>
      <button
        type="button"
        className={css(styles.toggleGroupButton, isSelected && styles.modifiers.selected)}
        aria-pressed={isSelected}
        onClick={handleChange}
        aria-label={ariaLabel}
        disabled={isDisabled}
        id={buttonId}
      >
        {icon && iconPosition === 'start' && toggleGroupIcon}
        {text && <ToggleGroupItemElement variant={ToggleGroupItemVariant.text}>{text}</ToggleGroupItemElement>}
        {icon && iconPosition === 'end' && toggleGroupIcon}
      </button>
    </div>
  );
};
ToggleGroupItem.displayName = 'ToggleGroupItem';
