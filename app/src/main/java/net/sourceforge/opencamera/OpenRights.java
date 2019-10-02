package net.sourceforge.opencamera;

import android.util.Log;

import java.util.Date;

public class OpenRights {
    private final String url;

    public OpenRights(String url) {
        this.url = url;
        Log.d("Open Rights", "url: " + this.url);
    }

    public boolean register(byte [] image, Date timestamp) {
        Log.d("Open Rights", "register new image");
        return true;
    }
}
