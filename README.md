# Build manually for Android

eas build --profile preview --platform android
eas build --profile development --platform android
eas build --profile preview --platform ios
eas build --profile development --platform ios
eas device:create
https://docs.expo.dev/build/eas-json/
https://docs.expo.dev/build/internal-distribution/
npx expo prebuild --platform android

Use eas commands for Android outside of Expo npm install -g eas-cli
> expo eject
setup all .env variables in the eas.json
› eas build -p android

example eas.json
{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {},
    "android": {
      "env": {
        "API_URL": "http://ec2-52-64-242-100.ap-southeast-2.compute.amazonaws.com:3000",
        "DEBUG": "true"
      }
    }
  },
  "submit": {
    "production": {}
  }
}

once build is done it probably will create a file that ends with "ABB". If you don't get the APK, then you need to install the Google bundle tool.  Download and install 
the Google bundle tool.  it's a jar file.  command to run is

java -jar bundletool-all-1.15.6.jar build-apks --bundle=path/to/your/app.aab --output=path/to/your/output.apks --mode=universal

THEN RUN

java -jar bundletool-all-1.15.6.jar extract-apks --apks=./output.apks --output-dir=./helpjuanandroid --device-spec=device-spec.json

you need the "device-spec.json" file that should contain this

{
  "supportedAbis": ["armeabi-v7a", "arm64-v8a"],
  "screenDensity": 320,
  "supportedLocales": ["en-US"],
  "sdkVersion":30
}

APK should be generated.  Connect your device to your laptop and install the apk file manually.
