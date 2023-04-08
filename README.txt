This website is built on React.js. To launch it locally on your computer you have to install Node.js v16.13.1. Then open the root folder of this application in your command panel \ terminal and enter the commands:

1. npm install - (this will install all needed dependencies and modules)
2. npm start - (this will run website locally and you can reach it by opening http://localhost:3000)

If you want to upload website to a hosting you should maky a production build. To do that, enter this command:

npm build

And wait for a few minutes. After compilation has done its job you will see the "build" folder in the website root folder. Just copy all files from "build" folder and upload to your hosting. It may require to configure routes handling on the hosting, but it is depends on the server you are using.