const headers = {
    token: '',
    app_version: '0.0.1',
    os: 'h5',
    station: '000000',
    version: 'v1.2'
};
const fetch = (type, h, url, p) => h.$http({
    method: type ? 'post' : 'get',
    url: url,
    headers: headers,
    params: p
});
const post = function (h, url, p, o) {
    h.axios.post({
        url,
        p,
        o
    });
}
const jsonp = (h, url, p, o) => h.$http.jsonp({
    url,
    p,
    o
});
var listIndex = (h) => fetch('get', h, '/manage/api/h5Index/listIndex');
var checkAppValidCode = (h) => fetch('get', h, '/passport/api/user/checkAppValidCode');
var slideshowPics = (h, p) => fetch('get', h, '/mall/api/mOrderMeeting/slideshowPics', p);
var register = (h, p) => fetch('get', h, 'passport/api/user/register', p);
var userLogin = function (h, p, o) {
    post(h, '/passport/api/user/userLogin', p, o)
};
var ycaptcha = (h, p) => fetch('jsonp', h, 'http://web-ycaptcha.111.com.cn/checkfrontjsonp?jsoncallback=jsonp1?', p);
export {
    headers,
    userLogin,
    listIndex,
    checkAppValidCode,
    slideshowPics,
    ycaptcha,
    register
}