# My Website

A static website generated with **CMake** and deployed to **GitHub Pages**.

## Build locally

```sh
cmake -B build -S .
cmake --build build
```

The site is generated in `build/site/`. Open `build/site/index.html` in a browser.

## Deploy

Push to the `main` branch — the GitHub Actions workflow builds and publishes automatically.