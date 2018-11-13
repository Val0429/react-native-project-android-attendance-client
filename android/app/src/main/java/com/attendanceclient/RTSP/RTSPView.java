package com.attendanceclient.RTSP;


import android.content.Context;

import com.facebook.drawee.controller.AbstractDraweeControllerBuilder;
import com.facebook.react.views.image.GlobalImageLoadListener;
import com.facebook.react.views.image.ReactImageView;

import javax.annotation.Nullable;

public class RTSPView extends ReactImageView {

    public RTSPView(
            Context context,
            AbstractDraweeControllerBuilder draweeControllerBuilder,
            @Nullable GlobalImageLoadListener globalImageLoadListener,
            @Nullable Object callerContext) {
        super(context, draweeControllerBuilder, globalImageLoadListener, callerContext);
    }

}
