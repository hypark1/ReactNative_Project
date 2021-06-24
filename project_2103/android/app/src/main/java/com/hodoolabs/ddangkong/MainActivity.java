package com.hodoolabs.ddangkong;

import com.facebook.react.ReactActivity;
import android.view.WindowManager;
import android.os.Bundle;
import com.dooboolab.naverlogin.RNNaverLoginPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ddangkong";
  }

  @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
