package com.attendanceclient;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.isap.RNStreamRtspPackage;
import com.oblador.shimmer.RNShimmerPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.isap.featurecompare.RNFeatureComparePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facedetection.RNFaceDetectionPackage;
import com.isap.RNStreamRtspPackage;
import com.rnfs.RNFSPackage;
import com.github.anrwatchdog.ANRError;
import com.github.anrwatchdog.ANRWatchDog;
import com.isap.RNStreamRtspPackage;
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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    public static MainApplication instance;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RNStreamRtspPackage(),
            new RNShimmerPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new RNFeatureComparePackage(),
            new FastImageViewPackage(),
            new RNFaceDetectionPackage(MainActivity.mActivity),
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

      instance = this;

    ANRWatchDog anrWatchDog;
    if (BuildConfig.DEBUG) {
      anrWatchDog = new ANRWatchDog(2000 /*timeout*/);
    }
    else {
      anrWatchDog = new ANRWatchDog().setANRListener(new ANRWatchDog.ANRListener() {
        @Override
        public void onAppNotResponding(ANRError error) {
          // Some tools like ACRA are serializing the exception, so we must make sure the exception serializes correctly
          try {
            new ObjectOutputStream(new ByteArrayOutputStream()).writeObject(error);
          }
          catch (IOException ex) {
            throw new RuntimeException(ex);
          }

          Log.i("JC+ WatchDog", "Error was successfully serialized");

          throw error;
        }
      });
    }

      LogUtils.init(this);

//    CrashHandler handler = CrashHandler.getInstance();
//    handler.init(getApplicationContext());

    SoLoader.init(this, /* native exopackage */ false);
  }

    @Override
    public Context getApplicationContext() {
        return super.getApplicationContext();
    }

    public static MainApplication getInstance() {
        return instance;
    }

}
