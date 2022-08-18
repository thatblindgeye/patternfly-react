import React from 'react';
import { Timestamp, TimestampFormat } from '@patternfly/react-core';

export const TimestampBasicFormats: React.FunctionComponent = () => {
  const currentDate = new Date();
  const dateAsISO = currentDate.toISOString();

  return (
    <>
      <Timestamp
        datetime={dateAsISO}
        date={currentDate}
        dateFormat={TimestampFormat.full}
        timeFormat={TimestampFormat.full}
      />
      <br />
      <br />
      <Timestamp datetime={dateAsISO} date={currentDate} dateFormat={TimestampFormat.full} />
      <br />
      <br />
      <Timestamp datetime={dateAsISO} date={currentDate} timeFormat={TimestampFormat.full} />
      <br />
      <br />
      <Timestamp
        datetime={dateAsISO}
        date={currentDate}
        dateFormat={TimestampFormat.medium}
        timeFormat={TimestampFormat.short}
        displaySuffix="US Eastern"
      />
    </>
  );
};
