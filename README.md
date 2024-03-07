# React Native Template App

## Troubleshooting

In case of issues with watchman (probably macOS), you can try

```sh
brew uninstall watchman
brew install watchman
watchman shutdown-server
watchman watch-del-all
yarn start --reset-cache
```

_you need to give it access to folder_
