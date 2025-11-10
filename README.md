Packaging the application

Before releasing
1) change package.json version
2) check public/electron.js is set to production
3) npm run build
4) git add . -> ... -> git push
5) npm run dist

```
npm run dist
```

Unsure about process.env.NODE_ENV, for now its set in environment folder as a variable

Issues
1. Preload.js can fail if a required package has issues. Delete one by one and ensure its loading

2. HashRouter instead of BrowserRouter if you are using files as a path.

3. Production and development environment can be a pain, better to just have 2 files and use whatever one is needed.

4. Building using npx electron-builder seems to be a much better choice over npm.

5. packaged & wont open, try npm run dev, if the app opens its listening on 
localhost:XXXX, ensure file path is correct. Revert back to issue 1. if needed.

6. Package.json file may require a "homapage": "./", while your there check main is also correct, "public/electron.js"

7. Made 2 files one for production and development in electron.js and swtich "isDevelopment" to true or false.