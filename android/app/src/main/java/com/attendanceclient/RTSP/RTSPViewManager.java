package com.attendanceclient.RTSP;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ImageResizeMode;

import javax.annotation.Nullable;

public class RTSPViewManager extends SimpleViewManager<RTSPView> {
    public static final String REACT_CLASS = "RTSPView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RTSPView createViewInstance(ThemedReactContext context) {
        return new RTSPView(context, Fresco.newDraweeControllerBuilder(), null, null);
    }

    @ReactProp(name = "src")
    public void setSrc(RTSPView view, @Nullable ReadableArray sources) {
        view.setSource(sources);
    }

    @ReactProp(name = "borderRadius", defaultFloat = 0f)
    public void setBorderRadius(RTSPView view, float borderRadius) {
        view.setBorderRadius(borderRadius);
    }

    @ReactProp(name = ViewProps.RESIZE_MODE)
    public void setResizeMode(RTSPView view, @Nullable String resizeMode) {
        view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
    }
}
