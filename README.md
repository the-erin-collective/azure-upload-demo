# files-in-cloud
Demo api / console app to upload files to azure blob storage.

## Setup

After cloning the repo there will be 2 folders, client and server, each has a different setup.

### server

The server is a web api that connects to azure blob storage, the server folder can be opened in Visual Studio (tested with VS2019), and run with IIS Express.

To get the azure link working you will need to modify `/server/appsettings.json` and replace the placeholder values for "BlobContainerName" and "ConnectionString" with the appropriate container name and connection string.

Nuget dependencies should be resolved via VS automatically.

The server will listen on port 3001 by default, for example `https://localhost:3001`, this can be changed in the file `/server/Properties/appsettings.json` by changing the `applicationUrl` value.

### client

The client is a node.js console application that is used from within the terminal / command prompt. 

Make sure the latest version of node.js is installed, then open a terminal in the `client` directory and run the command `npm install` to install dependencies.

If applicable, you can configure the app by editting the file `/client/config.json` 

The `apiurl` property should point to the server's endpoint (default for dev is `https://localhost:3001`, eg server's appsettings app url).

The `outputPath` property points to the directory path where files that are downloaded from the cloud will be saved. The default value is `"./output"` 

Then in that same directory run the command:

`node fic.ts`

This will run the app without any arguments prompting it to display help information, like which commands can be used and what they're parameters are.

For more detail on a specific command add the `-h` option to your command, for example to get help on the list command use...

`node fic.ts list -h`
