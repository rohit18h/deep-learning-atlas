"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

function AdsenseAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <Script
        id="adsense-script"
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5142374670189212"
        crossOrigin="anonymous"
      />

      <div className="w-full my-6">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5142374670189212"
          data-ad-slot="8558383579"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}

export default AdsenseAd;
