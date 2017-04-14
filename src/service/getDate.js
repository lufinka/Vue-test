const headers = {
    token: '',
    app_version: '0.0.1',
    os: 'h5',
    station: '000000',
    version: 'v1.2'
};
const fetch = (h, url, p, type) => h.$http({
    method: type ? 'post' : 'get',
    url: url,
    headers: headers,
    params: p
});
const post = (h, url, p, o) => h.$http.post({
    url,
    p,
    o
});
var listIndex = (h) => fetch(h, '/manage/api/h5Index/listIndex');
var slideshowPics = (h, p) => fetch(h, '/mall/api/mOrderMeeting/slideshowPics', p);
var userLogin = (h, p, o) => post(h, '/passport/api/user/userLogin', p, o);
export {
    headers,
    userLogin,
    listIndex,
    slideshowPics
}