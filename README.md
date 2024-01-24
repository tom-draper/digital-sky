# Digital Sky

A configurable, stochastic sky image generator.

Hosted at: https://tom-draper.github.io/digital-sky

To run locally, run `npm install` to install dependencies, then `npm run build` to compile, then open `index.html` in a browser.

## Gallery ✨

![Sky 10](https://user-images.githubusercontent.com/41476809/207963824-12030d7a-7dba-42b2-95a1-15dc4448f824.png)

![Sky 1](https://user-images.githubusercontent.com/41476809/162277455-fc3d8eb8-a651-4806-a110-12314f6fa3ea.png)

![Sky 2](https://user-images.githubusercontent.com/41476809/168876786-bfa8969b-ed12-4f4f-bffa-da3983b3ce5d.png)

![Sky 3](https://user-images.githubusercontent.com/41476809/168876609-506a7dfe-3fba-4aa4-b1fd-80eacb5b7d68.png)

![Sky 4](https://user-images.githubusercontent.com/41476809/182639197-60dd4e05-a035-4bdb-9848-f354399b634d.png)

![Sky 5](https://user-images.githubusercontent.com/41476809/179978653-2b7e5a2f-5631-4db1-9acd-11e0ab48ff7a.png)

![Sky 6](https://github.com/tom-draper/digital-sky/assets/41476809/1cead348-a8c1-48f2-819f-f3379b437207)

![Sky 7](https://user-images.githubusercontent.com/41476809/182632679-4641124a-f6b7-45d2-ae0d-71a53beaa05d.png)

![Sky 8](https://user-images.githubusercontent.com/41476809/182640461-c2c7291c-04c8-4c4f-94aa-c21708673b38.png)

![Sky 9)](https://user-images.githubusercontent.com/41476809/182721474-79caf7d5-8ea9-4ff7-b6a1-da720fa67ca3.png)

![Sky 10](https://user-images.githubusercontent.com/41476809/182638556-ad0e804a-f59d-457d-ad53-1b8e67129723.png)

![Sky 11](https://github.com/tom-draper/digital-sky/assets/41476809/69864103-33e3-4507-95a5-80a711c9d590)

## Bulk Generation

Skies can be randomly generated in bulk and saved to your file system using a script.

Ensure dependencies are installed:

```text
npm install
```

Then run `scripts/main.ts` with `ts-node`. The number of skies can be specified with the `-n` flag.

```text
ts-node scripts/main -n <count>
```

For more extreme skies, modify the random config generator function `randConfig()` in `src/config.ts` to your liking.

## Contributions

Contributions, issues and feature requests are welcome.

- Fork it (https://github.com/tom-draper/digital-sky)
- Create your feature branch (`git checkout -b my-new-feature`)
- Commit your changes (`git commit -am 'Add some feature'`)
- Push to the branch (`git push origin my-new-feature`)
- Create a new Pull Request