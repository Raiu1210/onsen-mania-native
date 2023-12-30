# NativeBase Expo Template

The official NativeBase template for [Expo](https://docs.expo.io/)

# iOS/Android diff

components/screens/SearchScreen.js

のMapViewの部分をbuild時に切り替える

## Usage

```sh
expo init my-app --template @native-base/expo-template
```


release way

```bash
eas build --platform ios --auto-submit
```

## release history

### v1.3.5

地図読み込みの高速化

### v1.4.0

android buildが通るように修正

### v1.5.0

問い合わせフォームの追加