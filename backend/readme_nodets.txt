https://www.youtube.com/watch?v=himWG72nZhs

npm i -g typescript dotenv ts-node ts-node-dev (to use tsc to compile ts to js)
tsc --init (to create tsconfig.json)

https://www.tutorialspoint.com/typeorm/typeorm_working_with_mongodb.htm
npx typeorm init --name MyProject --database mongodb --express

# to run and populate collection
npm i -g yarn
yarn add express bcryptjs cors formidable fs-extra jsonwebtoken onesignal-node typescript 
yarn add  @types/bcryptjs @types/jsonwebtoken @types/formidable @types/fs-extra @types/cors -D



edit package.json
yarn start


sudo npm i -g pm2

# advance ecosystem
pm2 init simple
pm2 start ecosystem.config.js

# ecosystem.config.js 
module.exports = {
  apps: [
    {
      name: "app1",
      script: "./index.js",
      node_args: "-r dotenv/config",
    },
  ],
};


"scripts": {
      "build": "tsc && cp *.key .env ecosystem.config.js ./build",      
}

# example of ecosystem.config.js 
module.exports = {
  apps: [
    {
      name: "app1",
      script: "./index.js",
    },
  ],
};
