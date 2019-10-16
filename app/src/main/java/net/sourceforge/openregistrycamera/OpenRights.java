package net.sourceforge.openregistrycamera;

import android.content.Context;
import android.content.SharedPreferences;
import android.provider.Settings.Secure;
import android.util.Log;
import android.preference.PreferenceManager;

import com.android.volley.*;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import java.math.BigInteger;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;


public class OpenRights {
    private static final String TAG = "OpenRights";

    private final RequestQueue queue;
    private final SharedPreferences prefs;
    private final String android_id;

    public OpenRights(Context context) {
        this.queue = Volley.newRequestQueue(context);
        this.prefs = PreferenceManager.getDefaultSharedPreferences(context);
        this.android_id = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);
    }

    private String getImageHash(byte[] image) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
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

        String imageHash = getImageHash(image);
        Log.d(TAG, imageHash);

        Map<String, String> payload = new HashMap<>();
        payload.put("timestamp", timestamp.toString());
        payload.put("owner", this.android_id);


        JsonObjectRequest req = new JsonObjectRequest(Request.Method.POST, baseUrl + "/api/register/" + imageHash, new JSONObject(payload),
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d(TAG, response.toString());
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.e(TAG, error.toString());
                    }
                });

        this.queue.add(req);
        return true;
    }
}
