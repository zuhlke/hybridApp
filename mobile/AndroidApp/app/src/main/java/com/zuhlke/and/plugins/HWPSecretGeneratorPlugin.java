package com.zuhlke.and.plugins;

import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * Created by and on 14/03/2016.
 */
public class HWPSecretGeneratorPlugin extends CordovaPlugin {

    static final String TAG = "SecretPlugin";
    static final String actionGenerate = "generateSecret";

    // note that webView.isPaused() is not Xwalk compatible, so tracking it poor-man style
    private boolean isPaused;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        // your init code here
        Log.e(TAG, "Plugin init");
    }

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
        if(this.isPaused) {
            return true;
        }

        Log.e(TAG, "Plugin exec");
        return true;
    }

    @Override
    public boolean execute(String action, String rawArgs, CallbackContext callbackContext) throws JSONException {
        if(this.isPaused) {
            return true;
        }
        Log.e(TAG, "Plugin exec " + action + " *" + rawArgs + "*");
        if(action.equals(actionGenerate)) {
            Log.e(TAG, "Plugin GENERATE " + action + "-" + actionGenerate);
            callbackContext.success(rawArgs);

            return true;
        }

        return false;
    }

    @Override
    public boolean execute(String action, CordovaArgs rawArgs, CallbackContext callbackContext) throws JSONException {
        if(this.isPaused) {
            return true;
        }

        Log.e(TAG, "Plugin exec");
        return true;
    }


    @Override
    public void onPause(boolean multitasking) {
//        if (mostRecentToast != null) {
//            mostRecentToast.cancel();
//        }
        this.isPaused = true;
    }

    @Override
    public void onResume(boolean multitasking) {
        this.isPaused = false;
    }
}
