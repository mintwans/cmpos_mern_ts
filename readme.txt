# vscode extension 
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension vscode-icons-team.vscode-icons
code --install-extension naumovs.color-highlight
code --install-extension esbenp.prettier-vscode
code --install-extension humao.rest-client
code --install-extension riazxrazor.html-to-jsx
code --install-extension christian-kohler.path-intellisense

# Install 
1. nodejs lts
2. install yarn with [sudo] npm i -g yarn
3. yarn add global create-react-app
4. vscode
5. vscode extentions
6. mongodb
7. mongoshell

# new project 
npx create-react-app cmpos_mern_ts --template typescript

# react snippet 
tsrc : gerate typescript fc

# install
yarn add @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid chart.js react-chartjs-2 @react-hook/debounce react-router-dom@5.3.2 @types/react-router-dom axios formik formik-material-ui moment react-moment url-join react-number-format @types/redux-logger react-redux redux redux-logger redux-thunk faker

# create folders
src/components
 - fragments
 - layouts
 - pages


# Page Components
// In Pages
yarn add global create-react-component-folder

// src/components/pages
npx crcf -f  --notest --typescript LoginPage RegisterPage ReportPage StockPage StockCreatePage StockEditPage TransactionPage ShopPage

// src/components/layouts
npx crcf -f  --notest --typescript Header Menu

// src/components/fragments
npx crcf -f  --notest --typescript StockCard Payment

npx crcf -f   --stylesext  --notest --typescript Test

tsconfig.json:
{
  "compilerOptions": {
    "lib": ["es6", "dom"],
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  }
}

# example drawers
https://mui.com/components/drawers/

node server.js
npx nodemon server.js
npm init

# backend packages
npx yarn add express fs-extra formidable cors bcryptjs rand-token jsonwebtoken mongoose mongoose-sequence onesignal-node
http://travistidwell.com/jsencrypt/demo/