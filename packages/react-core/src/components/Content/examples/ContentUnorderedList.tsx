import React from 'react';
import { TextList, TextListItem } from '@patternfly/react-core';

export const ContentUnorderedList: React.FunctionComponent = () => (
  <TextList>
    <TextListItem>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</TextListItem>
    <TextListItem>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</TextListItem>
    <TextListItem>
      Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.
      <TextList>
        <TextListItem>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</TextListItem>
        <TextListItem>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</TextListItem>
      </TextList>
    </TextListItem>
    <TextListItem>Ut non enim metus.</TextListItem>
  </TextList>
);