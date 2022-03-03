# Install 
1. nodejs lts
2. install yarn with [sudo] npm i -g yarn
2. vscode
3. vscode extentions
4. mongodb
5. mongoshell

# new project 
npx create-react-app cmpos_mern_ts --template typescript

# install
yarn add axios chart.js react-chartjs-2 react-moment react-number-format redux react-redux formik redux-logger redux-thunk url-join clsx @material-ui/lab  jsonwebtoken material-table formik-material-ui @types/redux-logger react-router-dom@5.2.0

yarn add @types/redux-logger
yarn add react-router-dom@5.2.0

yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material
yarn add @types/jsonwebtoken
yarn add @mui/x-data-grid
yarn add @material-ui/core
yarn add moment


# create folders
src/components
 - fragments
 - layouts
 - pages


# Page Components
// In Pages
yarn add create-react-component-folder

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

npx yarn add express formidable body-parser fs-extra

npx yarn add express body-parser fs-extra formidable cors bcryptjs rand-token jsonwebtoken mongoose mongoose-sequence onesignal-node
http://travistidwell.com/jsencrypt/demo/