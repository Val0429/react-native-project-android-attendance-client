package com.attendanceclient;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

import java.io.File;

// disable fabric.io
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

    public static Activity mActivity;

    @Override
    public void onCreate (Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity = this;

        // disable fabric.io
        Fabric.with(this, new Crashlytics());

        //Thread.setDefaultUncaughtExceptionHandler(new CrashHandler(this));

        if (getIntent().getBooleanExtra("crash", false)) {
            FileUtils.createSDDir(FileUtils.getDiskCacheDir(this) + "/crash_notify/");
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AttendanceClient";
    }
}
