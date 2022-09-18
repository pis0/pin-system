import { EventEmitter } from 'expo-modules-core';
import {printQRCode} from "./SunmiV2PrinterModule";

const emitter = new EventEmitter({} as any);

export default {
  PI: Math.PI,
  async setValueAsync(value: string): Promise<void> {
    emitter.emit('onChange', { value });
  },
  initService() {
    console.log('initService');
  },
  printQRCode(qrCodeData: string) {
    console.log('printQRCode - data: ' + qrCodeData);
  },
};
