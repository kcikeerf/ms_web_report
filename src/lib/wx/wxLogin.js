export default function wxLogin(settings) {
    let c = "default";
    settings.self_redirect === !0 ? c = "true" : settings.self_redirect === !1 && (c = "false");
    let d = document.createElement("iframe"), e = "https://open.weixin.qq.com/connect/qrconnect?appid=" + settings.appid + "&scope=" + settings.scope + "&redirect_uri=" + settings.redirect_uri + "&state=" + settings.state + "&login_type=jssdk&self_redirect=" + c;
    e += settings.style ? "&style=" + settings.style : "", e += settings.href ? "&href=" + settings.href : "", d.src = e, d.frameBorder = "0", d.allowTransparency = "true", d.scrolling = "no", d.width = "300px", d.height = "400px";
    let f = document.getElementById(settings.id);
    f.innerHTML = "", f.appendChild(d)
}