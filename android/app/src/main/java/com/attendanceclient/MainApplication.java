package com.attendanceclient;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.isap.featurecompare.RNFeatureComparePackage;
import com.facedetection.RNFaceDetectionPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFeatureComparePackage(),
            new RNFaceDetectionPackage(MainActivity.mActivity),
            new ReactVideoPackage(),
            new RNFetchBlobPackage(),
            new RNShimmerPackage(),
            new VectorIconsPackage(),
            new CustomToastPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
