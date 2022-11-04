import React from 'react';
import { Progress, ProgressProps, Radio, HelperText, HelperTextItem, Truncate } from '@patternfly/react-core';

export const ProgressHelperText: React.FunctionComponent = () => {
  type ProgressVariant = ProgressProps['variant'];

  const [selectedVariant, setSelectedVariant] = React.useState<ProgressVariant>(undefined);

  const variants: ProgressVariant[] = [undefined, 'success', 'warning', 'danger'];

  const isChecked = (variant: ProgressVariant) => variant === selectedVariant;

  const handleChange = (variant: ProgressVariant) => {
    setSelectedVariant(variant);
  };

  const variantOptions = variants.map(variant => (
    <Radio
      id={`progress-helper-text-${variant}-selector`}
      label={`${variant ? variant : 'default'} variant`}
      isChecked={isChecked(variant)}
      onChange={() => handleChange(variant)}
      key={variant || 'default'}
      name="Progress variant options"
    />
  ));

  return (
    <>
      {variantOptions}
      <br />
      <Progress
        value={33}
        title="Title"
        helperText={
          <Truncate content="Error: a really long error message whch should be truncated at some point a really long error message whch should be truncated at some point" />
        }
        variant={selectedVariant}
      />
      <Progress
        value={33}
        title="Title"
        helperText={'Just a string for helper text will render basic helper text with class "basic-helper-progress"'}
        variant={selectedVariant}
      />
      <Progress
        value={33}
        title="Title"
        helperText={
          <HelperText>
            <HelperTextItem>
              Passing HelperText component will render custom helper text without class "basic-helper-progress"
            </HelperTextItem>
          </HelperText>
        }
        variant={selectedVariant}
      />
    </>
  );
};
