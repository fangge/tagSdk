(function (window) {
    var TagSdk = function () {
        return;
    };
    /**
     * @description 扩展参数对比
     * @param {object} target - 目标对象
     * @param {object} source - 源对象
     * @returns {object} - 合成的对象
     */
    TagSdk.prototype.extend = function (target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    };
    /**
     * 初始化
     * @param opts 参数
     * @param {number} insertType - 输入标签的方式，13为回车，32为空格，如果选择32，则输入的标签不能允许有空格
     * @param {number} maxTag - 允许插入的标签数量
     * @param {number} maxTagLength - 标签字数限制
     * @param {string} maxTagTip - 可插入标签数量提示容器
     * @param {string} alertTag - 标签相关提示容器，如果为alert，则直接弹出系统提示框
     * @param {string} hotTag - 推荐标签
     * @param {string} inputTag - 输入标签为空的提示
     * @param {string} lengthError - 超过限制标签数量提示
     * @param {string} exitError - 标签去重提示
     * @param {bollean} emptyFlag - 是否必须填标签
     */
    TagSdk.prototype.tagInit = function(opts) {
        var t = this;
        t.defaults = {
            insertType:13,
            maxTag:20,
            maxTagLength:20,
            maxTagTip:'tag-num',
            alertTag:'tag-alert',
            hotTag:'tag-hot',
            inputTag:'tag-input',
            inputError:'请输入标签',
            numError:'已超过限制标签数',
            exitError:'已存在标签',
            emptyFlag:false
        };
        t.extend(t.defaults,opts);

        var tag_num = document.querySelector('[data-role='+t.defaults.maxTagTip+']'),
            tag_list = document.querySelectorAll('a.tag-list'),
            tag_input = document.querySelector('[data-role='+t.defaults.inputTag+']'),
              tag_hot = document.querySelector('[data-role='+t.defaults.hotTag+']');

        //初始化
        tag_num.innerHTML = t.defaults.maxTag - tag_list.length;
        if(t.defaults.insertType == 13){
            tag_input.setAttribute('placeholder','输入标签内容后按回车添加')
        }else{
            tag_input.setAttribute('placeholder','输入标签内容后按空格添加')
        }
        t.insertTag();
    };
    /**
     * 插入标签
     * @param input
     */
    TagSdk.prototype.insertTag = function () {
        var t = this,
            tag_list = document.querySelectorAll('a.tag-list'),
            tag_input = document.querySelector('[data-role='+t.defaults.inputTag+']');
        tag_input.addEventListener('keyup',function (e) {
            var event = e|| window.e,
                keyword,
                el = this,
                insertFlag = true;
            if(e.keyCode == t.defaults.insertType){
                keyword = el.value;
                if(keyword != ""){
                    if(tag_list.length<10){
                        if(tag_list.length >0){
                            //如果已有标签，则去重
                            [].forEach.call(tag_list,function (i) {
                                if(i.innerText == keyword)insertFlag = false;
                            })
                        }

                        if(keyword.length>t.defaults.maxTagLength){
                            t.userAlert("标签字数超过"+t.defaults.maxTagLength+'字，请重新输入！');
                        }
                    }else{
                        t.userAlert(t.defaults.numError);
                        return;
                    }
                }else{
                    t.userAlert(t.defaults.inputError);
                }
            }
        })
    }
    /**
     * 用户提示
     * @param str
     */
    TagSdk.prototype.userAlert = function (str) {
        var t = this;
        if(t.defaults.alertTag == "alert"){
            alert(str);
        }else{
            var  tag_alert = document.querySelector('[data-role='+t.defaults.alertTag+']');
            tag_alert.innerHTML = str;
        }
    }



    window.TagSdk = new TagSdk();
})(window, document);