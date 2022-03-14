const baseUrl = () => {
     return "http://192.168.18.107:8085"; //110
    // return "http://192.168.18.107:8086"; //110
    //  测试版本
};

export default {
    baseUrl: baseUrl(),
    uploadUrl: (() => {
        //
        return baseUrl() + "/common/Upload";
    })(),
};