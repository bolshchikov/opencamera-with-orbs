package net.sourceforge.opencamera;

import android.content.Context;
import android.util.Log;

import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.Date;

public class OpenRights {
    private static final String TAG = "OpenRights";

    private final RequestQueue queue;

    public OpenRights(Context context) {
        this.queue = Volley.newRequestQueue(context);
    }

    public boolean register(String baseUrl, byte[] image, Date timestamp) {
        Log.d(TAG, "register new image");
        Log.d(TAG, baseUrl);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, baseUrl + "/ping",
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d(TAG, response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d(TAG, error.toString());
                    }
                });

        this.queue.add(stringRequest);
        return true;
    }
}
