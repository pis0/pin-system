import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as SunmiV2PrinterModule from 'sunmi-v2-printer-module';

export default function App() {

    useEffect(() => {
        console.log("App wakeup")

        SunmiV2PrinterModule.initService();

    },[]);

    const qrCodeData: string = "https://google.com";

  return (
    <View style={styles.container}>
      <Text>{"[React Native Client]"}</Text>
      <Button
          onPress={() => {

              console.log("plau!");

              SunmiV2PrinterModule.printQRCode(qrCodeData);

          }}
          title="Print QrCode"
          color="#841584"
          accessibilityLabel="Print QrCode"
      />
      <Text>{qrCodeData}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
