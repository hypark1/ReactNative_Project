
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @invertase/react-native-apple-authentication
import com.RNAppleAuthentication.AppleAuthenticationAndroidPackage;
// @react-native-community/cameraroll
import com.reactnativecommunity.cameraroll.CameraRollPackage;
// @react-native-community/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/google-signin
import co.apptailor.googlesignin.RNGoogleSigninPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-community/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// @react-native-seoul/kakao-login
import com.dooboolab.kakaologins.RNKakaoLoginsPackage;
// @react-native-seoul/naver-login
import com.dooboolab.naverlogin.RNNaverLoginPackage;
// react-native-code-push
import com.microsoft.codepush.react.CodePush;
// react-native-config
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-fbsdk
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// react-native-firebase
import io.invertase.firebase.RNFirebasePackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-kakao-links
import co.jootopia.kakao.link.RNKakaoLinkPackage;
// react-native-localize
import com.reactcommunity.rnlocalize.RNLocalizePackage;
// react-native-picker-module
import com.taluttasgiran.pickermodule.ReactNativePickerModulePackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-secure-key-store
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-sound
import com.zmxv.RNSound.RNSoundPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-version-check
import io.xogus.reactnative.versioncheck.RNVersionCheckPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AppleAuthenticationAndroidPackage(),
      new CameraRollPackage(),
      new ClipboardPackage(),
      new RNGoogleSigninPackage(),
      new RNCMaskedViewPackage(),
      new RNCPickerPackage(),
      new RNKakaoLoginsPackage(),
      new RNNaverLoginPackage(),
      new CodePush(getResources().getString(com.hodoolabs.hodoomembers.R.string.CodePushDeploymentKey), getApplicationContext(), com.hodoolabs.hodoomembers.BuildConfig.DEBUG),
      new ReactNativeConfigPackage(),
      new RNDeviceInfo(),
      new FastImageViewPackage(),
      new FBSDKPackage(),
      new RNFirebasePackage(),
      new RNGestureHandlerPackage(),
      new RNKakaoLinkPackage(),
      new RNLocalizePackage(),
      new ReactNativePickerModulePackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSecureKeyStorePackage(),
      new RNSharePackage(),
      new RNSoundPackage(),
      new SplashScreenReactPackage(),
      new SvgPackage(),
      new RNVersionCheckPackage(),
      new ReactVideoPackage(),
      new RNCWebViewPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
