# Getting Started:
## Install NVM
To install or update nvm, you can use the [install script][2] using cURL:

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

or Wget:

```sh
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

To install lts node version 
```sh
nvm install --lts
```

To activate lts node version
```sh
nvm use --lts
```

For troubleshooting, see https://github.com/creationix/nvm/blob/master/README.md

## Install Vue CLI
This tool helps to setup and manage vue projects.

```sh
npm install -g @vue/cli
```

## Create new Vue project with WIP preset
The following command will create a new vue project skeleton from our preset.
The command will create a new folder with the project name at your current directory.
```sh
vue create --preset finpingvin/webcomponents-preset <name of project>
```

## Run the development server of your new project
The development serve should be running during development. It listens to file changes and rebuilds the project when a file changes.
```sh
cd <name of project>
npm run serve
```

## Visit your new app
http://localhost:8080/

# Continuing on existing app
If you clone an existing app, you must run
```sh
npm install
```
Before running your development server

# Optional
## Install yarn
TODO
