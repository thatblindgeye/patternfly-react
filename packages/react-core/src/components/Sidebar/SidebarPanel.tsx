import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Sidebar/sidebar';
import { formatBreakpointMods } from '../../helpers/util';

export enum SidebarPanelWidthType {
  default = 'default',
  width25 = 'width_25',
  width33 = 'width_33',
  width50 = 'width_50',
  width66 = 'width_66',
  width75 = 'width_75',
  width100 = 'width_100'
}

export interface SidebarPanelProps extends Omit<React.HTMLProps<HTMLDivElement>, 'width'> {
  children: React.ReactNode;
  /** Indicates whether the panel is positioned statically or sticky to the top. Default is sticky on small screens when the orientation is stack, and static on medium and above screens when the orientation is split. */
  variant?: 'default' | 'sticky' | 'static';
  /** Removes the background color. */
  hasNoBackground?: boolean;
  /** Adds padding to the panel. */
  hasPadding?: boolean;
  /** Sets the panel width at various breakpoints. Default is 250px when the orientation is split. */
  width?: {
    default?: 'default' | 'width_25' | 'width_33' | 'width_50' | 'width_66' | 'width_75' | 'width_100';
    sm?: 'default' | 'width_25' | 'width_33' | 'width_50' | 'width_66' | 'width_75' | 'width_100';
    md?: 'default' | 'width_25' | 'width_33' | 'width_50' | 'width_66' | 'width_75' | 'width_100';
    lg?: 'default' | 'width_25' | 'width_33' | 'width_50' | 'width_66' | 'width_75' | 'width_100';
    xl?: 'default' | 'width_25' | 'width_33' | 'width_50' | 'width_66' | 'width_75' | 'width_100';
    '2xl'?: 'default' | 'width_25' | 'width_33' | 'width_50' | 'width_66' | 'width_75' | 'width_100';
  };
  /** Variant of the sidebar panel background. */
  backgroundVariant?: 'default' | 'secondary';
}

export const SidebarPanel: React.FunctionComponent<SidebarPanelProps> = ({
  className,
  children,
  variant = 'default',
  hasNoBackground,
  hasPadding,
  width,
  backgroundVariant = 'default',
  ...props
}: SidebarPanelProps) => (
  <div
    className={css(
      styles.sidebarPanel,
      variant !== 'default' && styles.modifiers[variant],
      hasNoBackground && styles.modifiers.noBackground,
      hasPadding && styles.modifiers.padding,
      formatBreakpointMods(width, styles),
      backgroundVariant !== 'default' && styles.modifiers[backgroundVariant],
      className
    )}
    {...props}
  >
    {children}
  </div>
);
SidebarPanel.displayName = 'SidebarPanel';
