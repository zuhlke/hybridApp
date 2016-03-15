package com.zuhlke.and.androidapp;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

//        Button left = (Button)findViewById(R.id.buttonLeft);
//        left.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Log.d(TAG, "GO left");
//            }
//        });

        Button right = (Button)findViewById(R.id.buttonRight);
        right.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d(TAG, "GO right");

                Context context = v.getContext();
                Intent intent = new Intent(context, CordovaViewActivity.class);
                context.startActivity(intent);
            }
        });
    }
}
