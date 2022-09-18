package expo.modules.sunmiv2printermodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import android.content.Context
import android.widget.Toast
import android.graphics.Bitmap

import printerhelper.utils.BitmapUtil
import printerhelper.utils.BluetoothUtil
import printerhelper.utils.ESCUtil
import printerhelper.utils.SunmiPrintHelper

class SunmiV2PrinterModuleModule : Module() {

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('SunmiV2PrinterModule')` in JavaScript.
    Name("SunmiV2PrinterModule")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on th"e JavaScript thread.
    Function("initService") {
      Toast.makeText(context, "init Sunmi Printer Service!", Toast.LENGTH_SHORT).show()
      SunmiPrintHelper.getInstance().initSunmiPrinterService(context)
    }

    Function("printQRCode") { qrCodeData: String ->
      Toast.makeText(context, "print QRCode!", Toast.LENGTH_SHORT).show()
      printQRCode(qrCodeData)
    }


    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a view manager. The view manager definition is built from
    // the definition components used in the closure passed to viewManager.
    // Definition components that are accepted as part of the view manager definition: `View`, `Prop`.
    ViewManager {
      // Defines the factory creating a native view when the module is used as a view.
      View { context ->
        SunmiV2PrinterModuleView(context) 
      }

      // Defines a setter for the `name` prop.
      Prop("name") { view: SunmiV2PrinterModuleView, prop: String ->
        println(prop)
      }
    }

  }


   private val context
          get() = requireNotNull(appContext.reactContext)

  private val print_size = 8
  private val error_level = 3

  private fun printQRCode(qrCodeData: String) {

    val bitmap: Bitmap = BitmapUtil.generateBitmap(qrCodeData, 9, 700, 700)

    if (!BluetoothUtil.isBlueToothPrinter) {
      SunmiPrintHelper.getInstance()
        .printQr(qrCodeData, print_size, error_level)
      SunmiPrintHelper.getInstance().feedPaper()
    } else {
      BluetoothUtil.sendData(
        ESCUtil.getPrintQRCode(
          qrCodeData,
          print_size,
          error_level
        )
      )
      BluetoothUtil.sendData(ESCUtil.nextLine(3))
    }
  }
}
