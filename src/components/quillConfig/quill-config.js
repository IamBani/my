
/*富文本编辑图片上传配置*/
const uploadConfig = {
    action:  config.baseUrl+'/file/upload',  // 必填参数 图片上传地址
    methods: 'POST',  // 必填参数 图片上传方式
    token: localStorage.getItem("token"),  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'file',
    //name: 'img',  // 必填参数 文件的参数名
    size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg,' , // 可选 可上传的图片格式
    type:'audio/mp4,video/mp4,video/3gpp,video/webm,video/h264'
    
};

import config from "../../Config"
// import { message } from "ant-design-vue";
import { message } from "element-ui";
// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],
    [{'font': []}],
    [{'align': []}],
    ['clean'],
    ['link', 'image', 'video']
];
const handlers = {
    image: function image() {
        var self = this

        var fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);
            fileInput.classList.add('ql-image');
            // 监听选择文件
            fileInput.addEventListener('change', function () {
                // 创建formData
                var formData = new FormData();
                formData.append('file', fileInput.files[0]);
                // formData.append('object','product');
                // 如果需要token且存在token
                // uploadConfig.token =localStorage.getItem("token")
                // if (uploadConfig.token) {
                //     formData.append('token', localStorage.getItem("token"))
                // }
                // 图片上传
                var xhr = new XMLHttpRequest();
                console.log(uploadConfig.methods, uploadConfig.action, true)
                xhr.open(uploadConfig.methods, uploadConfig.action, true);

                // 上传数据成功，会触发
                xhr.onload = function (e) {
                   console.log('self',self)
                    if (xhr.status === 200) {
                        var res = JSON.parse(xhr.responseText);
                        let length = self.quill.getSelection(true).index;
                        //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
                        // console.log(res.data)            
                        self.quill.insertEmbed(length, 'image', config.baseUrl+res.data);
                        self.quill.setSelection(length + 1)
                    }
                    fileInput.value = ''
                };
                // 开始上传数据
                xhr.upload.onloadstart = function (e) {
                    
                    fileInput.value = ''
                    // 上传提示
                };
                // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
                xhr.upload.onerror = function (e) {
                };
                // 上传数据完成（成功或者失败）时会触发
                xhr.upload.onloadend = function (e) {
                    console.log('上传结束')
                };
                xhr.send(formData)
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    },
    // // // // 测试添加视频
    video: function(value){
        var self = this
        var dataList=[];
        var fileInput = this.container.querySelector('input.ql-video[type=file]')
        
        if (fileInput === null) {
            fileInput = document.createElement('input');
          
            // fileInput.appendChild(text);
            fileInput.setAttribute('type', 'file');
              // 设置图片参数名
              if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.type);
            fileInput.classList.add('ql-video');
             // 监听选择文件
             fileInput.addEventListener('change', function () {
                // 创建formData
                var formData = new FormData();
                formData.append('file', fileInput.files[0]);
                //    图片上传
                let xhrx = new XMLHttpRequest();
                // console.log(uploadConfig.methods, uploadConfig.action, true)
                xhrx.open(uploadConfig.methods, uploadConfig.action, true);

                // 上传数据成功，会触发
                xhrx.onload = function (e) {
                    if (xhrx.status === 200) {
                        // console.log('xhrx.status',xhrx.response) 
                        var res = JSON.parse(xhrx.responseText);
                        let length = self.quill.getSelection(true).index;
                        // message.success(res.msg)
                        // console.log(length);
                        //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
                        self.quill.insertEmbed(length, 'video', config.baseUrl+res.data);
                        self.quill.setSelection(length + 1)
                    }
                    fileInput.value = ''
                };
                // 开始上传数据
                xhrx.upload.onloadstart = function (e) {
                    // console.log('正在上传')
                    message.success('正在上传')
                    // 0%
                };
                // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
                xhrx.upload.onerror = function (e) {
                    message.success('网络异常')
                };
                // 上传数据完成（成功或者失败）时会触发
                xhrx.upload.onloadend = function (e) {
                    //console.log('上传结束')
                   message.success('上传成功')
                   //100%
                };
                xhrx.send(formData)
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    }
};
// 添加上传进度条


export default {
    placeholder: '',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    }
};