# React Native Template App
Simple React-Native app template which utilizes Stack & Drawer navigation. 
Allows to save data to the redux store and keep them in async storage with Redux-Persist.

## Troubleshooting

In case of issues with Watchman (probably macOS), you can try

```sh
brew uninstall watchman
brew install watchman
watchman shutdown-server
watchman watch-del-all
yarn start --reset-cache
```

_you need to give it access to folder_

## Technologies
- React Native 0.73.0
- React Navigation 6.x.x
- Redux 9.1.0
- Redux Toolkit 2.2.1
- Redux Persist 6.0.0
- Async storage 1.22.3
