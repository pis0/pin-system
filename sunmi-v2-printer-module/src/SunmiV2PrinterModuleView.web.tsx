import * as React from 'react';

import { SunmiV2PrinterModuleViewProps } from './SunmiV2PrinterModule.types';

function SunmiV2PrinterModuleWebView(props: SunmiV2PrinterModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}

export default SunmiV2PrinterModuleWebView;
