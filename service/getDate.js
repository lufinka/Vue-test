import * as vue from '../main'
import resource from 'vue-resource'
const headers = {
    token: '',
    app_version: '0.0.1',
    os: 'h5',
    station: '000000',
    version: 'v1.2'
};
var fetch = (h, url, params, type) => h.$http({
    method: type ? 'post' : 'get',
    url: url,
    headers: headers,
    params: params
})
var listIndex = () => fetch(vue.vm, '/manage/api/h5Index/listIndex');
var slideshowPics = (params) => fetch(vue.vm, '/mall/api/mOrderMeeting/slideshowPics', params);
export {
    listIndex,
    slideshowPics
}
