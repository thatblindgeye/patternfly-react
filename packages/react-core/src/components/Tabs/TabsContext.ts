import { createContext } from 'react';

export interface TabsContextProps {
  variant: 'default' | 'secondary';
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  localActiveKey: string | number;
  uniqueId: string;
  handleTabClick: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventKey: number | string,
    tabContentRef: React.RefObject<any>
  ) => void;
  handleTabClose?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    eventKey: number | string,
    tabContentRef?: React.RefObject<any>
  ) => void;
}

export const TabsContext = createContext<TabsContextProps>({
  variant: 'default',
  mountOnEnter: false,
  unmountOnExit: false,
  localActiveKey: '',
  uniqueId: '',
  handleTabClick: () => null,
  handleTabClose: undefined
});

export const TabsContextProvider = TabsContext.Provider;
export const TabsContextConsumer = TabsContext.Consumer;
