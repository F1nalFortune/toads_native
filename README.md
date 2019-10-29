# Toads Native iOS Application

https://docs.mapbox.com/ios/navigation/overview/


Using the Merriweather Google Font found here: https://fonts.google.com/specimen/Merriweather

Update package.json
```
"rnpm": {
  "assets": [
    "./assets/fonts"
  ]
}
```

Copy font files
```
mkdir -p ./assets/fonts
cp ~/Downloads/Merriweather/*.ttf ./assets/fonts
```

Rename incorrect files

```
npm i opentype.js
```

Save node.js file

```
const fs = require("fs");
const path = require("path");
const opentype = require("opentype.js");

const fontFormats = [".ttf", ".otf"];
const fontsPath = path.join(__dirname, "assets", "fonts");
const filenames = fs.readdirSync(fontsPath);

filenames.forEach((filename) => {
  const extension = path.extname(filename)

  if (!fontFormats.includes(extension)) {
    return;
  }

  const fontPath = path.join(fontsPath, filename);
  const font = opentype.loadSync(fontPath);
  
  const newFilename = font.names.postScriptName.en + extension;
  const newFontPath = path.join(fontsPath, newFilename);
  
  const relativeFontPath = path.relative(__dirname, fontPath);
  const relativeNewFontPath = path.relative(__dirname, newFontPath);

  if (filename === newFilename) {
    console.log(`${relativeFontPath} is already named correctly.`);
  } else {
    fs.renameSync(fontPath, newFontPath);
    
    console.log(`Renamed ${relativeFontPath} to ${relativeNewFontPath}.`);
  }
});
```

Link fonts
```
react-native link
npx react-native-asset
```

Install NPM packages and pods
```
rm -rf node_modules && npm i && cd ios/ && pod repo update && pod install && cd ../
```

Update Carthage packages
```
carthage update --platform iOS
```

Open NavDemo.xcworkspace in XCODE and Build to iPhone iOS version 11.0+
