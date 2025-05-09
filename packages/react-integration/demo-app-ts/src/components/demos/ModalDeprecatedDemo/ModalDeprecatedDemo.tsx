import { Component, Fragment } from 'react';
import { Button, Title, TitleSizes } from '@patternfly/react-core';
import { Modal as ModalDeprecated, ModalVariant as ModalVariantDeprecated } from '@patternfly/react-core/deprecated';
import WarningTriangleIcon from '@patternfly/react-icons/dist/esm/icons/warning-triangle-icon';
import spacing from '@patternfly/react-styles/css/utilities/Spacing/spacing';

interface ModalDemoState {
  isModalOpen: boolean;
  isModalDescriptionOpen: boolean;
  isHelpModalOpen: boolean;
  isSmallModalOpen: boolean;
  isMediumModalOpen: boolean;
  isLargeModalOpen: boolean;
  isHalfWidthModalOpen: boolean;
  isCustomHeaderFooterModalOpen: boolean;
  isNoHeaderModalOpen: boolean;
  isModalCustomEscapeOpen: boolean;
  isModalAlertVariantOpen: boolean;
  customEscapePressed: boolean;
  isCustomFocusModalOpen: boolean;
}

export class ModalDeprecatedDemo extends Component<React.HTMLProps<HTMLDivElement>, ModalDemoState> {
  static displayName = 'ModalDeprecatedDemo';

  state = {
    isModalOpen: false,
    isModalDescriptionOpen: false,
    isHelpModalOpen: false,
    isSmallModalOpen: false,
    isMediumModalOpen: false,
    isLargeModalOpen: false,
    isHalfWidthModalOpen: false,
    isCustomHeaderFooterModalOpen: false,
    isNoHeaderModalOpen: false,
    isModalCustomEscapeOpen: false,
    isModalAlertVariantOpen: false,
    customEscapePressed: false,
    isCustomFocusModalOpen: false
  };

  handleModalToggle = (_event: KeyboardEvent | React.MouseEvent) => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen
    }));
  };

  handleModalDescriptionToggle = () => {
    this.setState(({ isModalDescriptionOpen }) => ({
      isModalDescriptionOpen: !isModalDescriptionOpen
    }));
  };

  handleSmallModalToggle = () => {
    this.setState(({ isSmallModalOpen }) => ({
      isSmallModalOpen: !isSmallModalOpen
    }));
  };

  handleHelpModalToggle = () => {
    this.setState(({ isHelpModalOpen }) => ({
      isHelpModalOpen: !isHelpModalOpen
    }));
  };

  handleMediumModalToggle = () => {
    this.setState(({ isMediumModalOpen }) => ({
      isMediumModalOpen: !isMediumModalOpen
    }));
  };

  handleLargeModalToggle = () => {
    this.setState(({ isLargeModalOpen }) => ({
      isLargeModalOpen: !isLargeModalOpen
    }));
  };

  handleHalfWidthModalToggle = () => {
    this.setState(({ isHalfWidthModalOpen }) => ({
      isHalfWidthModalOpen: !isHalfWidthModalOpen
    }));
  };

  handleCustomHeaderFooterModalToggle = () => {
    this.setState(({ isCustomHeaderFooterModalOpen }) => ({
      isCustomHeaderFooterModalOpen: !isCustomHeaderFooterModalOpen
    }));
  };

  handleNoHeaderModalToggle = () => {
    this.setState(({ isNoHeaderModalOpen }) => ({
      isNoHeaderModalOpen: !isNoHeaderModalOpen
    }));
  };

  handleModalCustomEscapeToggle = (_event?: any, customEscapePressed?: boolean) => {
    this.setState(({ isModalCustomEscapeOpen }) => ({
      isModalCustomEscapeOpen: !isModalCustomEscapeOpen,
      customEscapePressed: customEscapePressed ?? false
    }));
  };

  handleModalAlertVariantToggle = (_event?: any, customEscapePressed?: boolean) => {
    this.setState(({ isModalAlertVariantOpen }) => ({
      isModalAlertVariantOpen: !isModalAlertVariantOpen,
      customEscapePressed: customEscapePressed ?? false
    }));
  };

  handleCustomFocusModalToggle = () => {
    this.setState(({ isCustomFocusModalOpen }) => ({
      isCustomFocusModalOpen: !isCustomFocusModalOpen
    }));
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderModal() {
    const { isModalOpen } = this.state;

    return (
      <ModalDeprecated
        title="Modal Header"
        isOpen={isModalOpen}
        onClose={this.handleModalToggle}
        actions={[
          <Button key="cancel" data-id="modal-01-cancel-btn" variant="secondary" onClick={this.handleModalToggle}>
            Cancel
          </Button>,
          <Button key="confirm" data-id="modal-01-confirm-btn" variant="primary" onClick={this.handleModalToggle}>
            Confirm
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderModalWithDescription() {
    const { isModalDescriptionOpen } = this.state;

    return (
      <ModalDeprecated
        title="Modal Header"
        isOpen={isModalDescriptionOpen}
        onClose={this.handleModalDescriptionToggle}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua."
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleModalDescriptionToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleModalDescriptionToggle}>
            Confirm
          </Button>
        ]}
        id="test-modal-id"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderSmallModal() {
    const { isSmallModalOpen } = this.state;

    return (
      <ModalDeprecated
        variant={ModalVariantDeprecated.small}
        position="top"
        title="Modal Header"
        isOpen={isSmallModalOpen}
        onClose={this.handleSmallModalToggle}
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleSmallModalToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleSmallModalToggle}>
            Confirm
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderMediumModal() {
    const { isMediumModalOpen } = this.state;

    return (
      <ModalDeprecated
        variant={'medium'}
        title="Modal Header"
        isOpen={isMediumModalOpen}
        onClose={this.handleMediumModalToggle}
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleMediumModalToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleMediumModalToggle}>
            Confirm
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderLargeModal() {
    const { isLargeModalOpen } = this.state;

    return (
      <ModalDeprecated
        variant={ModalVariantDeprecated.large}
        title="Modal Header"
        isOpen={isLargeModalOpen}
        onClose={this.handleLargeModalToggle}
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleLargeModalToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleLargeModalToggle}>
            Confirm
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderHalfWidthModal() {
    const { isHalfWidthModalOpen } = this.state;

    return (
      <ModalDeprecated
        width={'50%'}
        title="Modal Header"
        isOpen={isHalfWidthModalOpen}
        onClose={this.handleHalfWidthModalToggle}
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleHalfWidthModalToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleHalfWidthModalToggle}>
            Confirm
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderCustomHeaderFooterModal() {
    const { isCustomHeaderFooterModalOpen } = this.state;

    const header = (
      <Fragment>
        <Title id="customHeaderTitle" headingLevel="h1" size={TitleSizes['2xl']}>
          Custom Modal Header/Footer
        </Title>
        <p id="customHeaderDescription" className={spacing.ptSm}>
          Allows for custom content in the header and/or footer by passing components.
        </p>
      </Fragment>
    );

    const footer = (
      <Title id="customFooterTitle" headingLevel="h4" size={TitleSizes.md}>
        <WarningTriangleIcon />
        <span className={spacing.plSm}>Custom modal footer.</span>
      </Title>
    );

    return (
      <ModalDeprecated
        variant={ModalVariantDeprecated.large}
        isOpen={isCustomHeaderFooterModalOpen}
        header={header}
        title="custom header example"
        aria-labelledby="customHeaderTitle"
        aria-describedby="custom-header-example"
        onClose={this.handleCustomHeaderFooterModalToggle}
        footer={footer}
      >
        <span id="custom-header-example">
          When static text describing the modal is available, it can be wrapped with an ID referring to the modal's
          aria-describedby value.
        </span>
        <br />
        <br />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalDeprecated>
    );
  }

  renderNoHeaderModal() {
    const { isNoHeaderModalOpen } = this.state;

    return (
      <ModalDeprecated
        variant={ModalVariantDeprecated.large}
        aria-label="Modal Header"
        isOpen={isNoHeaderModalOpen}
        aria-describedby="no-header-example"
        onClose={this.handleNoHeaderModalToggle}
        actions={[
          <Button key="confirm" variant="primary" onClick={this.handleNoHeaderModalToggle}>
            Close
          </Button>
        ]}
      >
        <span id="no-header-example">
          When static text describing the modal is available, it can be wrapped with an ID referring to the modal's
          aria-describedby value.
        </span>{' '}
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </ModalDeprecated>
    );
  }

  renderModalWithCustomEscape() {
    const { isModalCustomEscapeOpen } = this.state;

    return (
      <ModalDeprecated
        title="Modal Header"
        isOpen={isModalCustomEscapeOpen}
        onClose={this.handleModalCustomEscapeToggle}
        aria-describedby="custom-escape-example"
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleModalCustomEscapeToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleModalCustomEscapeToggle}>
            Confirm
          </Button>
        ]}
        onEscapePress={(event: any) => this.handleModalCustomEscapeToggle(event, true)}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderModalWithAlertVariant() {
    const { isModalAlertVariantOpen } = this.state;

    return (
      <ModalDeprecated
        title="Modal Header"
        titleIconVariant="warning"
        isOpen={isModalAlertVariantOpen}
        onClose={this.handleModalAlertVariantToggle}
        aria-describedby="custom-escape-example"
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleModalAlertVariantToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleModalAlertVariantToggle}>
            Confirm
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderHelpModal() {
    const { isHelpModalOpen } = this.state;

    return (
      <ModalDeprecated
        variant={ModalVariantDeprecated.small}
        help={<Button variant="plain">Help</Button>}
        position="top"
        title="Modal Header"
        isOpen={isHelpModalOpen}
        onClose={this.handleHelpModalToggle}
        actions={[
          <Button key="cancel" variant="secondary" onClick={this.handleHelpModalToggle}>
            Cancel
          </Button>,
          <Button key="confirm" variant="primary" onClick={this.handleHelpModalToggle}>
            Confirm
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  renderCustomFocusModal() {
    const { isCustomFocusModalOpen } = this.state;

    return (
      <ModalDeprecated
        elementToFocus="#modal-custom-focus-confirm-button"
        title="Modal with custom focus"
        isOpen={isCustomFocusModalOpen}
        onClose={this.handleCustomFocusModalToggle}
        actions={[
          <Button
            id="modal-custom-focus-confirm-button"
            key="confirm"
            variant="primary"
            onClick={this.handleCustomFocusModalToggle}
          >
            Confirm
          </Button>,
          <Button
            id="modal-custom-focus-cancel-button"
            key="cancel"
            variant="link"
            onClick={this.handleCustomFocusModalToggle}
          >
            Cancel
          </Button>
        ]}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </ModalDeprecated>
    );
  }

  render() {
    const buttonStyle = {
      marginRight: 20,
      marginBottom: 20
    };

    return (
      <Fragment>
        <div id="tabstop-test" tabIndex={0} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <Button style={buttonStyle} variant="primary" onClick={this.handleModalToggle} id="showDefaultModalButton">
            Show Modal
          </Button>
          <Button style={buttonStyle} variant="primary" onClick={this.handleSmallModalToggle} id="showSmallModalButton">
            Show Small Modal
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleMediumModalToggle}
            id="showMediumModalButton"
          >
            Show Medium Modal
          </Button>
          <Button style={buttonStyle} variant="primary" onClick={this.handleLargeModalToggle} id="showLargeModalButton">
            Show Large Modal
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleHalfWidthModalToggle}
            id="showHalfWidthModalButton"
          >
            Show 50% Width Modal
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleCustomHeaderFooterModalToggle}
            id="showCustomHeaderFooterModalButton"
          >
            Show Custom Header/Footer Modal
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleNoHeaderModalToggle}
            id="showNoHeaderModalButton"
          >
            Show No Header Modal
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleModalDescriptionToggle}
            id="showDescriptionModalButton"
          >
            Show Modal with Description
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleModalCustomEscapeToggle}
            id="showCustomEscapeModalButton"
            className={this.state.customEscapePressed ? 'customEscapePressed' : ''}
          >
            Show Modal with custom escape button behavior
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleModalAlertVariantToggle}
            id="showCustomEscapeModalButton"
            className={this.state.customEscapePressed ? 'customEscapePressed' : ''}
          >
            Show Modal with alert variant
          </Button>
          <Button style={buttonStyle} variant="primary" onClick={this.handleHelpModalToggle} id="showHelpModalButton">
            Show Help Modal
          </Button>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={this.handleCustomFocusModalToggle}
            id="showCustomFocusModalButton"
          >
            Show Custom Focus Modal
          </Button>
        </div>
        {this.renderModal()}
        {this.renderSmallModal()}
        {this.renderMediumModal()}
        {this.renderLargeModal()}
        {this.renderHalfWidthModal()}
        {this.renderCustomHeaderFooterModal()}
        {this.renderNoHeaderModal()}
        {this.renderModalWithDescription()}
        {this.renderModalWithCustomEscape()}
        {this.renderModalWithAlertVariant()}
        {this.renderHelpModal()}
        {this.renderCustomFocusModal()}
      </Fragment>
    );
  }
}
