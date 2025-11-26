const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin') return;

  const appName = context.packager.appInfo.productFilename;

  // Check environment variables
  if (!process.env.APPLE_ID || !process.env.APPLE_APP_SPECIFIC_PASSWORD || !process.env.APPLE_TEAM_ID) {
    console.log("Notarization skipped — missing APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, or APPLE_TEAM_ID");
    return;
  }

  console.log("Notarizing with Apple...");

  return await notarize({
    appBundleId: "com.tungpham.autoclicker",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD, // use app-specific password
    teamId: process.env.APPLE_TEAM_ID,
  });
};