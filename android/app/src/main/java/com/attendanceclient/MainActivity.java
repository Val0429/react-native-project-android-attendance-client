package com.attendanceclient;

import android.app.Activity;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

import java.io.File;

public class MainActivity extends ReactActivity {

    public static Activity mActivity;

    @Override
    public void onCreate (Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mActivity = this;

        Thread.setDefaultUncaughtExceptionHandler(new CrashHandler(this));

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
