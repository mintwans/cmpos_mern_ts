var OneSignal = require("onesignal-node");

const myClient = new OneSignal.Client(
  "51a68888-4ee1-4fe1-aadb-d6b2af6ec131", // appId
  "ZmMzNTQzNDItM2JjZS00NWI3LWE1OGMtNWVhYmNiMzFjMjE1" // apiKey or restKey
);

const notification = {
  contents: {
    en: "CodeMobiles.com",
    th: "โค้ดโมบายส์ จำกัด"
  },
  included_segments: ["Subscribed Users"]
};

// or you can use promise style:
myClient
  .createNotification(notification)
  .then(response => {
    console.log(JSON.stringify(response));
  })
  .catch(e => {
    console.log(JSON.stringify(e));
  });
