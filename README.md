# Packaging the application

# Autoupdate
package.json - publish - make sure the repo is pointing to the correct place

# Notarize, add to terminal environment before "npm run dist"
```
export APPLE_ID="example@icloud.com"
export APPLE_APP_SPECIFIC_PASSWORD="app-specific-password"
export ASC_PROVIDER="teamid"
```
Check if its in the environment
```
echo $APPLE_ID
echo $APPLE_APP_SPECIFIC_PASSWORD
echo $ASC_PROVIDER
```

# Before releasing
1) change package.json version
2) check public/electron.js is set to production
3) npm run build
4) git add . -> ... -> git push
5) npm run dist

```
npm run dist
```

Issues
1. Preload.js can fail if a required package has issues. Delete one by one and ensure its loading

2. HashRouter instead of BrowserRouter if you are using files as a path.

3. Production and development environment can be a pain, better to just have 2 files and use whatever one is needed.

4. Building using npx electron-builder seems to be a much better choice over npm.

5. packaged & wont open, try npm run dev, if the app open's its listening on localhost:XXXX, ensure file path is correct. Revert back to issue 1. if needed.

6. Package.json file may require a "homepage": "./", while your there check main is also correct, "public/electron.js"

7. Made 2 files one for production and development in electron.js and swtich between the two less prone to bugs but more annoying.

8. Releasing to GITHUB and the app starts having DAMAGE problems?
    - xattr path/to/applciation.app
    com.apple.provenance → macOS knows it came from the internet (Safari, Chrome, etc.).
    com.apple.quarantine → Gatekeeper has locked it and won’t let it run because it’s
    - xattr -cr path/to/applciation.app
    to then remove and allow it to work again