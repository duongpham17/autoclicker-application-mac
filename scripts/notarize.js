const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;

  // Only notarize for macOS
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: "com.tungpham.autoclicker",
    appPath: `${appOutDir}/${appName}.app`,
    keychainProfile: "AC_PASSWORD"
  });
};