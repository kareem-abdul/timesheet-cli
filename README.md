# TIME SHEET CLI

A cli tool for managing timesheet

## Installation (using pre-build binaries)
> These binaries are only x64 if you want something specific see [here](#build-it-yourself)

- download the correspoding binary from releases [here](https://github.com/kareem-abdul/timesheet-cli/releases/latest) <br> 
and place them in one of the folders that are in your `PATH` environment variable. <br>
## For Linux
 As an example for linux do the following <br>
- download the linux x64 binary from [here](https://github.com/kareem-abdul/timesheet-cli/releases/latest/download/timesheet-linux)
- then run the following
    ```cmd
    chmod +x ~/Downloads/timesheet-linux;
    mv ~/Downloads/timesheet-linux ~/.local/bin/timesheet;
    ```
    make sure that `~/.local/bin` is in your `PATH` variable.
<br><br>

## Build it yourself

- Prerequisite: _nodejs 16 or above, npm 9_
- clone this repo
    ```cmd
    git clone https://github.com/kareem-abdul/timesheet-cli.git
    ```
- then run the following
    ```cmd
    cd timesheet-cli;
    npm ci;
    npm run build;
    ```
- then run the following npm script with your prefered environment as the target.
    ```cmd
    npm run package -- --target node18-alpine-x64
    ```
    Refer [this](https://github.com/vercel/pkg#targets) to know more about targets.
- then your binaries should be in the folder `dist/bin`
