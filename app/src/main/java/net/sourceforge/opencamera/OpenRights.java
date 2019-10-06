package net.sourceforge.opencamera;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.preference.PreferenceManager;

import com.android.volley.*;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.security.MessageDigest;


public class OpenRights {
    private static final String TAG = "OpenRights";

    private final RequestQueue queue;
    private final SharedPreferences prefs;

    public OpenRights(Context context) {
        this.queue = Volley.newRequestQueue(context);
        this.prefs = PreferenceManager.getDefaultSharedPreferences(context);
    }

    private String getImageHash(byte[] image) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            byte[] messageDigest = md.digest(image);
            BigInteger no = new BigInteger(1, messageDigest);
            String hashtext = no.toString(16);

            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }

            return hashtext;

        } catch (NoSuchAlgorithmException e) {
            Log.d(TAG, e.toString());
        }

        return "";
    }

    public boolean register(byte[] image, Date timestamp) {
        Log.d(TAG, "register new image");

        String baseUrl = prefs.getString("preference_open_registry_url", "");
        if (baseUrl == "") {
            return false;
        }

        Log.d(TAG, baseUrl);
        Log.d(TAG, getImageHash(image));
        Log.d(TAG, timestamp.toString());

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
