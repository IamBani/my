<template>
  <div class="qqmaps">
    <!-- <div id="container" class="mapqq"></div> -->
    <!-- v-show="listShow" -->
    <div class="list" id="left">
      <div class="heightbooy" v-for="(item,index) in stionList" :key="index">
        <div
          class="borderstyle"
          @click="list(index,item)"
          :class="borderstyle==index?'hover':'active'"
        >
          <div>
            <span class="labelStyle">{{index}}</span>
          </div>
          <div class="ringhtStyle">
            <p class="title">{{item.title}}</p>
            <div style="height: auto;">{{item.address}}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="constructor" class="mapqq"></div>
    <div class="panel">
      <input
        id="keyword"
        type="text"
        autocomplete="off"
        value
        @input="getSuggestions()"
        class="inputStyle"
      />
      <input id="search" type="button" class="btn" value="搜索" @click="searchByKeyword" />
      <ul id="suggestionList" v-for="(item,index) in suggestionList" :key="index">
        <li>
          <a href="#" @click="setSuggestion(index)">{{item.title}}</a>
        </li>
      </ul>
    </div>
    <!-- 列表 -->
  </div>
</template>

<script>
import $ from "jquery";
// import maps from "qqmap";
// * as
import * as maps from "qqmap";
export default {
  props: {
    lng: {
      type: String
    },
    lat: {
      type: String
    }
  },
  data() {
    return {
      borderstyle: 0,
      //特殊存值
      index: null,
      // listShow: false,
      //编辑查询
      endUname: "",
      //------------
      keyword: "",
      //赋值所有参数 （清除map 所有赋值）
      marker: null,
      label: null,
      infoWindow: null,
      infoWindows: null,
      //点聚合对象 createCluster
      markers: null, //MVCArray对象
      markerCluster: null,
      latLng: null,

      marker: null,
      getlatlng: null,
      overlay: null,
      // 测试 自动填充框
      dataList: [],
      labelList: [],

      //存储地址
      suggestionList: [],
      stionList: [],
      //左侧
      latList: [],
      lngList: [],
      map: null,
      getAddress: null,
      getAddCode: null,
      addressKeyword: "",
      longitude: 0, //经度
      latitude: 0, //纬度
      Latitudeandlongitude: "", //经纬度
      address: "", //地址

      //本地图片
      urLImage: ""
    };
  },
  mounted() {
    this.inits();
  },

  methods: {
    Showclick() {
      var that = this;
      //  that.listShow=false;
      //清除左侧
      var op = document.getElementById("search");
      if (op.value === "搜索") {
        op.value = "搜索";
        document.getElementById("left").style.display = "none"; //影藏左边的列表
        document.getElementById("left").style.width = "0"; //影藏左边的列表
        document.getElementById("constructor").style.width = "100%"; //右边的地图，全屏
      } else {
        op.value = "搜索";
        document.getElementById("left").style.display = ""; //影藏左边的列表
        document.getElementById("left").style.width = "30%"; //影藏左边的列表
        document.getElementById("constructor").style.width = "65%"; //右边的地图，全屏
      }
      that.suggestionList = [];
      that.stionList = [];
    },
    list(index, item) {
      var that = this;
      that.borderstyle = index;
      //特殊处理 index 新列表 数据未发生改变 传最新index 在循环体内使用
      var keyword = this.stionList[index].title;
      var city = this.stionList[index].city;

      if (that.marker != null) {
        that.marker.setMap(null);
      }
      if (that.infoWindow != null) {
        that.infoWindow.close(that.map.getCenter());
      }
      that.qqmapData(
        that.stionList[index].location.lat,
        that.stionList[index].location.lng,
        that.stionList[index].address
      );
      that.map.panTo(
        new qq.maps.LatLng(item.location.lat, item.location.lng),
        10
      );
      that.marker = new qq.maps.Marker({
        id: item.id,
        position: new qq.maps.LatLng(item.location.lat, item.location.lng),
        clickable: true,
        map: that.map
      });
      //修改打点样式图片
      var anchor = new qq.maps.Point(10, 30);
      var size = new qq.maps.Size(32, 30);
      var origin = new qq.maps.Point(0, 0);
      var icon = new qq.maps.MarkerImage(
        "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
        size,
        origin,
        anchor
      );
      var originShadow = new qq.maps.Point(32, 0);
      var shadow = new qq.maps.MarkerImage(
        "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
        size,
        originShadow,
        anchor
      );
      that.marker = new qq.maps.Marker({
        icon: icon,
        shadow: shadow,
        map: that.map,
        position: new qq.maps.LatLng(item.location.lat, item.location.lng),
        animation: qq.maps.MarkerAnimation.BOUNCE
      });
    },
    //初始化地图
    inits() {
      var that = this;
      document.getElementById("keyword").value = "";
      //使用自己的腾讯地图key
      maps.init("MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY", () => {
        var myLatlng = new qq.maps.LatLng(
          30.45569387962833,
          114.42734017968178
        );
        var myOptions = {
          zoom: 15,
          center: myLatlng,
          mapTypeId: qq.maps.MapTypeId.ROADMAP
        };

        that.map = new qq.maps.Map(
          document.getElementById("constructor"),
          myOptions
        );
        // 获取点击后的地址
        qq.maps.event.addListener(that.map, "click", function(event) {
          var marker = new qq.maps.Marker({
            position: event.latLng,
            map: that.map
          });
          // 获取点击后的地图坐标
          that.longitude = event.latLng.lng; //经度
          that.latitude = event.latLng.lat; //纬度

          that.getAddressCode();
          qq.maps.event.addListener(that.map, "click", function(event) {
            marker.setMap(null);
          });
        });

        //调用地名显示地图位置并设置地址
        that.getAddress = new qq.maps.Geocoder({
          complete: function(result) {
            that.map.setCenter(result.detail.location);
            //输入调用地图经纬度和地址
            that.longitude = result.detail.location.lat; //经度
            that.latitude = result.detail.location.lng; //纬度
            that.Latitudeandlongitude = that.longitude + "," + that.latitude; //经纬度
            //获取地理位置
            var data = {
              location: that.Latitudeandlongitude,
              /*换成自己申请的key*/
              key: "MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY",
              get_poi: 0
            };
            var url = "https://apis.map.qq.com/ws/geocoder/v1/?";
            data.output = "jsonp";
            $.ajax({
              type: "get",
              dataType: "jsonp",
              data: data,
              jsonp: "callback",
              jsonpCallback: "QQmap",
              url: url,
              success: function(json) {
                var toStr = JSON.stringify(json);

                that.address =
                  json.result.address +
                  json.result.formatted_addresses.recommend;
                that.dataList = json.data;
              },
              error: function(err) {
                alert("服务端错误，请刷新浏览器后重试");
              }
            });
          }
        });
        //通过坐标来显示地图地址
        that.getAddCode = new qq.maps.Geocoder({
          complete: function(result) {
            that.addressKeyword = result.detail.address;
          }
        });
      });
    },

    //测试部分 使用者在搜索框中输入文字时触发
    getSuggestions() {
      var that = this;
      // 使用者在搜索框中输入文字时触发
      var keyword = document.getElementById("keyword").value;
      if (keyword) {
        // 使用者在搜索框中输入文字时触发
        var data = {
          region: "全国",
          /*申请的key*/
          key: "MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY",
          get_poi: 0,
          keyword: keyword
        };
        var url = "https://apis.map.qq.com/ws/place/v1/suggestion";
        data.output = "jsonp";
        $.ajax({
          type: "get",
          dataType: "jsonp",
          data: data,
          jsonp: "callback",
          jsonpCallback: "QQmap",
          url: url,
          success: function(json) {
            var toStrs = JSON.stringify(json);
            that.suggestionList = json.data;
          }
        });
      }
    },
    //测试选择li 切换li查询
    setSuggestion(index, item) {
      var that = this;
      that.stionList = [];
      var op = document.getElementById("search");
      if (op.value === "搜索") {
        op.value = "搜索";
        document.getElementById("left").style.display = ""; //影藏左边的列表
        document.getElementById("left").style.width = "30%"; //影藏左边的列表
        document.getElementById("constructor").style.width = "65%"; //右边的地图，全屏
      } else {
        op.value = "搜索";
        document.getElementById("left").style.display = "none"; //影藏左边的列表
        document.getElementById("left").style.width = "0"; //影藏左边的列表
        document.getElementById("constructor").style.width = "100%"; //右边的地图，全屏
      }

      // 点击输入提示后，于地图中用点标记绘制该地点，并显示信息窗体，包含其名称、地址等信息
      document.getElementById("keyword").value = this.suggestionList[
        index
      ].title;
      var city = this.suggestionList[index].city;

      var keyword = document.getElementById("keyword").value;

      that.suggestionDatlist(keyword);
      this.suggestionList = [];
    },

    //测试 查询功能 清除上一次打点   infoWindow窗口
    searchByKeyword() {
      var that = this;
      that.suggestionList = [];
      // that.listShow = true;
      //样式 - 修改影藏左侧的列表

      var keyword = document.getElementById("keyword").value;
      // that.inits();
      //展开左侧 列表

      //查全部
      that.suggestionDatlist(keyword);
      var op = document.getElementById("search");
      if (op.value === "搜索") {
        op.value = "搜索";
        document.getElementById("left").style.display = ""; //影藏左边的列表
        document.getElementById("left").style.width = "25%"; //影藏左边的列表
        document.getElementById("constructor").style.width = "74%"; //右边的地图，全屏
      } else {
        op.value = "搜索";
        document.getElementById("left").style.display = "none"; //影藏左边的列表
        document.getElementById("left").style.width = "0"; //影藏左边的列表
        document.getElementById("constructor").style.width = "100%"; //右边的地图，全屏
      }
    },

    //聚合方法 value数组集合
    createCluster(value) {
      var that = this;

      if (value.length > 0) {
        that.markers = new qq.maps.MVCArray();

        var dataSticonList = [];
        that.latList = [];
        dataSticonList = value;
        dataSticonList.forEach(item => {
          that.latList.push([item.location.lat, item.location.lng]);
        });
        for (var i = 0; i < that.latList.length; i++) {
          that.marker = new qq.maps.Marker({
            position: that.latLng,
            map: that.map
          });
        }
        that.markers.push(that.marker);

        that.markerClusterer = new qq.maps.MVCArray();
        //创建点聚合对象
        that.markerCluster = new qq.maps.MarkerCluster({
          id: "constructor",
          map: that.map,
          enableDefaultStyle: true,
          minimumClusterSize: 2,
          markers: that.markers,
          zoomOnClick: true,
          gridSize: 30,
          averageCenter: false,
          maxZoom: 20
        });
      } else {
        //创建点聚合对象
        that.markerCluster = new qq.maps.MarkerCluster({
          id: "constructor",
          map: that.map,
          enableDefaultStyle: true,
          minimumClusterSize: 2,
          markers: qq.maps.LatLng(value[0][0], value[0][1]),
          zoomOnClick: true,
          gridSize: 30,
          averageCenter: false,
          maxZoom: 20
        });
      }
    },

    // 地址名：urlName
    getAddressCode() {
      var that = this;
      that.inits();
      var that = this;
      var lat = parseFloat(that.latitude);
      var lng = parseFloat(that.longitude);
      var latLng = new qq.maps.LatLng(lat, lng);
      that.Latitudeandlongitude = lat + "," + lng;
      //获取地理位置
      var data = {
        location: that.Latitudeandlongitude,
        /*申请的key*/
        key: "MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY",
        get_poi: 0
      };
      var url = "https://apis.map.qq.com/ws/geocoder/v1/?";
      data.output = "jsonp";
      $.ajax({
        type: "get",
        dataType: "jsonp",
        data: data,
        jsonp: "callback",
        jsonpCallback: "QQmap",
        url: url,
        success: function(json) {
          var toStr = JSON.stringify(json);
          that.Latlongitude(that.Latitudeandlongitude);

          that.getAddCode.getAddress(latLng);
        },
        error: function(err) {
          alert("服务端错误，请刷新浏览器后重试");
        }
      });
    },
    //坐标解析地址 value 值发生改变时清理 旧坐标 传参
    Latlongitude(value) {
      var that = this;
      that.inits();
      that.labelList = [];
      that.infoWindow = null;
      that.marker = null;

      if (value) {
        //   // // 使用者在搜索框中输入文字时触发
        var data = {
          region: "全国",
          /*申请的key*/
          key: "MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY",
          get_poi: 0,
          location: value
        };
        var url = "https://apis.map.qq.com/ws/geocoder/v1/?location";
        data.output = "jsonp";
        $.ajax({
          type: "get",
          dataType: "jsonp",
          data: data,
          jsonp: "callback",
          jsonpCallback: "QQmap",
          url: url,
          success: function(json) {
            var toStrs = JSON.stringify(json);
            console.log("json", json);
            that.labelList = [];
            that.labelList = json.result;
            //修改打点样式图片
            var anchor = new qq.maps.Point(10, 30);
            var size = new qq.maps.Size(32, 30);
            var origin = new qq.maps.Point(0, 0);
            var icon = new qq.maps.MarkerImage(
              "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
              size,
              origin,
              anchor
            );
            var originShadow = new qq.maps.Point(32, 0);
            var shadow = new qq.maps.MarkerImage(
              "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
              size,
              originShadow,
              anchor
            );
            //打点
            that.marker = new qq.maps.Marker({
              icon: icon,
              shadow: shadow,
              map: that.map,
              position: new qq.maps.LatLng(
                that.labelList.location.lat,
                that.labelList.location.lng
              ),
              animation: qq.maps.MarkerAnimation.BOUNCE
            });
            //中心点
            that.map.panTo(
              new qq.maps.LatLng(
                that.labelList.location.lat,
                that.labelList.location.lng
              ),
              10
            );
            //信息弹窗
            that.infoWindow = new qq.maps.InfoWindow({
              map: that.map,
              center: new qq.maps.LatLng(
                that.labelList.location.lat,
                that.labelList.location.lng
              ),
              offset: { x: 0, y: -32 }
            });

            that.infoWindow.open();
            that.infoWindow.setContent(
              `<h3 style=" width: 312px;height:30px;">${that.labelList.address}</h3>
                  <p>坐标：${that.labelList.location.lat},${that.labelList.location.lng}</p>`
            );
            that.infoWindow.setPosition(that.map.getCenter());

            //点击 就删除
            qq.maps.event.addListener(that.map, "click", function(event) {
              that.marker.setMap(null);
              that.infoWindow.close(that.map.getCenter());
            });
            //提交 传参
            if (that.labelList != []) {
              that.qqmapData(
                that.labelList.ad_info.location.lat,
                that.labelList.ad_info.location.lng,
                that.labelList.address
              );
            }
          }
        });
      }
    },
    // 通过坐标获取地址
    geturlname(label) {
      var that = this;
      that.inits();
      document.getElementById("keyword").value = "";
      that.labelList = [];
      that.marker = null;
      that.infoWindow = null;
      that.endUname = label.storeDimension + "," + label.storeLongitude;

      var data = {
        region: "全国",
        /*申请的key*/
        key: "MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY",
        get_poi: 0,
        location: that.endUname
      };
      var url = "https://apis.map.qq.com/ws/geocoder/v1/?location";
      data.output = "jsonp";
      $.ajax({
        type: "get",
        dataType: "jsonp",
        data: data,
        jsonp: "callback",
        jsonpCallback: "QQmap",
        url: url,
        success: function(json) {
          var toStrs = JSON.stringify(json);
          console.log("json", json);

          that.labelList = [];
          that.labelList = json.result;

          if (that.infoWindow != null) {
            that.infoWindow.close(that.map.getCenter());
          }

          //修改 打点样式 飞机图片
          var anchor = new qq.maps.Point(10, 30);
          var size = new qq.maps.Size(32, 30);
          var origin = new qq.maps.Point(0, 0);
          var icon = new qq.maps.MarkerImage(
            "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
            size,
            origin,
            anchor
          );
          var originShadow = new qq.maps.Point(32, 0);
          var shadow = new qq.maps.MarkerImage(
            "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
            size,
            originShadow,
            anchor
          );
          //打点
          that.marker = new qq.maps.Marker({
            icon: icon,
            shadow: shadow,
            map: that.map,
            position: new qq.maps.LatLng(
              that.labelList.location.lat,
              that.labelList.location.lng
            ),
            animation: qq.maps.MarkerAnimation.BOUNCE
          });
          // 定位移动打点的位置
          that.map.panTo(
            new qq.maps.LatLng(
              that.labelList.location.lat,
              that.labelList.location.lng
            ),
            10
          );
          //信息弹框
          that.infoWindow = new qq.maps.InfoWindow({
            map: that.map,
            center: new qq.maps.LatLng(
              that.labelList.location.lat,
              that.labelList.location.lng
            ),
            offset: { x: 0, y: -32 }
          });

          that.infoWindow.open();
          that.infoWindow.setContent(
            `<h3 style=" width: 312px;height:50px;">${label.storeAddress}</h3>
            <p>坐标：${that.labelList.location.lat},${that.labelList.location.lng}</p>`
          );
          that.infoWindow.setPosition(that.map.getCenter());

          //点击 就删除
          qq.maps.event.addListener(that.map, "click", function(event) {
            that.marker.setMap(null);
            that.infoWindow.close(that.map.getCenter());
          });
          //确定 保存地址坐标
          if (that.labelList != []) {
            that.qqmapData(
              that.labelList.ad_info.location.lat,
              that.labelList.ad_info.location.lng,
              that.labelList.address
            );
          }
        }
      });
    },
    // 根据地址查坐标
    //urlName: 地址（精准查询）返回坐标
    NewStoreAddress(urlName) {
      var that = this;

      that.inits();
      (document.getElementById("keyword").value = ""), (that.marker = null);
      that.infoWindow = null;
      if (urlName != "") {
        //  1.获取坐标
        var data = {
          address: urlName,
          /*申请的key*/
          key: "MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY",
          get_poi: 0
        };
        var url = "https://apis.map.qq.com/ws/geocoder/v1/?";
        data.output = "jsonp";
        $.ajax({
          type: "get",
          dataType: "jsonp",
          data: data,
          jsonp: "callback",
          jsonpCallback: "QQmap",
          url: url,
          success: function(json) {
            var toStrs = JSON.stringify(json);

            if (json.status == 0) {
              this.lat = json.result.location.lat;
              this.lng = json.result.location.lng;

              //修改打点样式图片
              var anchor = new qq.maps.Point(10, 30);
              var size = new qq.maps.Size(32, 30);
              var origin = new qq.maps.Point(0, 0);
              var icon = new qq.maps.MarkerImage(
                "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
                size,
                origin,
                anchor
              );
              var originShadow = new qq.maps.Point(32, 0);
              var shadow = new qq.maps.MarkerImage(
                "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
                size,
                originShadow,
                anchor
              );
              //打点
              that.marker = new qq.maps.Marker({
                icon: icon,
                shadow: shadow,
                map: that.map,
                position: new qq.maps.LatLng(this.lat, this.lng),
                animation: qq.maps.MarkerAnimation.BOUNCE
              });
              //中心点
              that.map.panTo(new qq.maps.LatLng(this.lat, this.lng), 10);
              //信息窗
              that.infoWindow = new qq.maps.InfoWindow({
                map: that.map,
                center: new qq.maps.LatLng(this.lat, this.lng),
                offset: { x: 0, y: -32 }
              });

              that.infoWindow.open();
              that.infoWindow.setContent(
                `<h3 style=" width: 312px;height:60px;">${urlName}</h3>
                  <p>坐标：${this.lat},${this.lng}</p>`
              );
              that.infoWindow.setPosition(that.map.getCenter());
              //点击 就删除
              qq.maps.event.addListener(that.map, "click", function(event) {
                that.marker.setMap(null);
                that.infoWindow.close(that.map.getCenter());
              });
              //确定地址  选中地址
              //    if (that.labelList != []) {
              //          that.qqmapData(
              //   that.labelList.location.lat,
              //   that.labelList.location.lng,
              //   that.labelList.address
              // );
              // }
            }
          }
        });
      }
    },
    //直接打点渲染页面位置
    handleEditMap(val) {
      var that = this;
      if (that.infoWindow != null) {
        that.infoWindow.close(that.map.getCenter());
      }

      //修改 打点样式 飞机图片
      var anchor = new qq.maps.Point(10, 30);
      var size = new qq.maps.Size(32, 30);
      var origin = new qq.maps.Point(0, 0);
      var icon = new qq.maps.MarkerImage(
        "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
        size,
        origin,
        anchor
      );
      var originShadow = new qq.maps.Point(32, 0);
      var shadow = new qq.maps.MarkerImage(
        "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
        size,
        originShadow,
        anchor
      );
      //打点
      that.marker = new qq.maps.Marker({
        icon: icon,
        shadow: shadow,
        map: that.map,
        position: new qq.maps.LatLng(val.storeDimension, val.storeLongitude),
        animation: qq.maps.MarkerAnimation.BOUNCE
      });
      // 定位移动打点的位置
      that.map.panTo(
        new qq.maps.LatLng(val.storeDimension, val.storeLongitude),
        10
      );
      //信息弹框
      that.infoWindow = new qq.maps.InfoWindow({
        map: that.map,
        center: new qq.maps.LatLng(val.storeDimension, val.storeLongitude),
        offset: { x: 0, y: -32 }
      });

      that.infoWindow.open();
      that.infoWindow.setContent(
        `<h3 style=" width: 312px;height:50px;">${val.storeAddress}</h3>
            <p>坐标：${val.storeDimension},${val.storeLongitude}</p>`
      );
      that.infoWindow.setPosition(that.map.getCenter());
      that.qqmapData(val.storeDimension, val.storeLongitude, val.storeAddress);
    },

    //智能解析地址
    //keyword: 地址
    async suggestionDatlist(keyword) {
      var that = this;
      that.inits();
      that.marker = null;
      that.infoWindow = null;
      if (keyword) {
        // 使用者在搜索框中输入文字时触发
        var data = {
          region: "全国",
          /*申请的key*/
          key: "MLMBZ-AVEKP-SZMDV-LKXZD-YIM72-7NFQY",
          get_poi: 0,
          keyword: keyword
          //  smart_address: keyword
        };
        //智能地址解析
        // var url = "https://apis.map.qq.com/ws/geocoder/v1/?smart_address"
        //模糊查询
        var url = "https://apis.map.qq.com/ws/place/v1/suggestion";
        //地址解析坐标
        //  var url = "https://apis.map.qq.com/ws/geocoder/v1/?address"
        data.output = "jsonp";
        $.ajax({
          type: "get",
          dataType: "jsonp",
          data: data,
          jsonp: "callback",
          jsonpCallback: "QQmap",
          url: url,
          success: function(json) {
            var toStrs = JSON.stringify(json);
            console.log("json", json);
            if (json.count > 0) {
              var stionList = [];
              stionList = json.data;
              that.stionList = stionList;

              //正常流程
              //查询流程

              if (that.stionList.length > 0) {
                //调用聚合方法

                that.stionList.forEach((item, index) => {
                  that.map.panTo(
                    new qq.maps.LatLng(item.location.lat, item.location.lng),
                    10
                  );
                  //打点
                  that.marker = new qq.maps.Marker({
                    id: item.id,
                    position: new qq.maps.LatLng(
                      item.location.lat,
                      item.location.lng
                    ),
                    clickable: true,
                    map: that.map
                  });
                  //标签 个数
                  that.label = new qq.maps.Label({
                    position: new qq.maps.LatLng(
                      item.location.lat,
                      item.location.lng
                    ),
                    map: that.map,
                    content: index.toString()
                  });
                  //选中地址
                  qq.maps.event.addListener(that.marker, "click", function(
                    event
                  ) {
                    if (that.markers != null) {
                      that.markers.setMap(null);
                    }
                    that.qqmapData(
                      item.location.lat,
                      item.location.lng,
                      item.address
                    );
                    that.map.panTo(
                      new qq.maps.LatLng(item.location.lat, item.location.lng),
                      10
                    );
                    //修改打点样式图片
                    var anchor = new qq.maps.Point(10, 30);
                    var size = new qq.maps.Size(32, 30);
                    var origin = new qq.maps.Point(0, 0);
                    var icon = new qq.maps.MarkerImage(
                      "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
                      size,
                      origin,
                      anchor
                    );
                    var originShadow = new qq.maps.Point(32, 0);
                    var shadow = new qq.maps.MarkerImage(
                      "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
                      size,
                      originShadow,
                      anchor
                    );
                    that.markers = new qq.maps.Marker({
                      icon: icon,
                      shadow: shadow,
                      map: that.map,
                      position: new qq.maps.LatLng(
                        item.location.lat,
                        item.location.lng
                      ),
                      animation: qq.maps.MarkerAnimation.BOUNCE
                    });
                  });
                });
              } else {
                //视图定位
                that.map.panTo(
                  new qq.maps.LatLng(
                    that.stionList[0].location.lat,
                    that.stionList[0].location.lng
                  ),
                  10
                );
                //打点
                that.marker = new qq.maps.Marker({
                  position: new qq.maps.LatLng(
                    that.stionList[0].location.lat,
                    that.stionList[0].location.lng
                  ),
                  clickable: true,
                  map: that.map
                });
                //显示文本信息 个数
                that.label = new qq.maps.Label({
                  position: new qq.maps.LatLng(
                    that.stionList[0].location.lat,
                    that.stionList[0].location.lng
                  ),
                  map: that.map,
                  content: index.toString()
                });
                //点击坐标触发 //循环走完了  判断上一个方法体存不存在
                qq.maps.event.addListener(that.marker, "click", function(
                  event
                ) {
                  let lat = that.stionList[0].location.lat;
                  let lng = that.stionList[0].location.lng;
                  //中心点
                  that.map.panTo(
                    new qq.maps.LatLng(
                      that.stionList[0].location.lat,
                      that.stionList[0].location.lng
                    ),
                    10
                  );
                  //中心点
                  // that.map.panTo(new qq.maps.LatLng(lat, lng), 10);
                  //修改打点样式图片
                  var anchor = new qq.maps.Point(10, 30);
                  var size = new qq.maps.Size(32, 30);
                  var origin = new qq.maps.Point(0, 0);
                  var icon = new qq.maps.MarkerImage(
                    "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
                    size,
                    origin,
                    anchor
                  );
                  var originShadow = new qq.maps.Point(32, 0);
                  var shadow = new qq.maps.MarkerImage(
                    "https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/plane.png",
                    size,
                    originShadow,
                    anchor
                  );
                  //打点
                  that.marker = new qq.maps.Marker({
                    icon: icon,
                    shadow: shadow,
                    map: that.map,
                    position: new qq.maps.LatLng(
                      that.stionList[0].location.lat,
                      that.stionList[0].location.lng
                    ),
                    animation: qq.maps.MarkerAnimation.BOUNCE
                  });
                });
              }
            } else {
              //地图全屏 隐藏左侧
              var op = document.getElementById("search");
              op.value = "搜索";
              document.getElementById("left").style.display = "none"; //影藏左边的列表
              document.getElementById("left").style.width = "0"; //影藏左边的列表
              document.getElementById("constructor").style.width = "100%"; //右边的地图，全屏
              //提示
              this.$message.success("查无该地区，请重新输入搜索");
            }
          }
        });
      }
    },
    //取最后一个 打点位置
    // 坐标 x lat
    //y:lng
    //地址 address
    qqmapData(lat, lng, address) {
      var that = this;
      //坐标转换
      that.$emit("getMapList", lat, lng, address);
    }
  }
};
</script>

<style lang="scss" >
.qqmaps {
  position: relative;
  width: 100%;
  height: 100%;
  .search {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    display: flex;
  }
  #suggestionList {
    background-color: #fff;
    z-index: 5;
  }
  .mapqq {
    width: 100%;
    height: 95%;
    margin-bottom: 14px;
    float: right;
  }
  .labelStyle {
    font-size: 16px;
    float: left;
    width: 5%;
  }
  .title {
    font-size: 17px;
    height: 14px;
  }
  .ringhtStyle {
    height: auto;
    float: right;
    width: 90%;
    height: 70px;
  }

  .panel {
    position: absolute;
    background: #fff;
    width: 412px;
    // padding: 20px;
    z-index: 9999;
    // top: 100px;
    // top: 20px;
    left: 150px;
  }

  .ant-form-item {
    color: #409eff;
  }
  .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    background-color: #409eff;
    border: 0;
    color: #fff;
    margin-left: 10px;
    border-radius: 5px;
  }

  .inputStyle {
    height: 30px;
    width: 300px;
    border: 1px solid #7a7b7b;
    border-radius: 5px;
  }
  #suggestionList {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  input:focus {
    border: 1px solid #409eff;
    outline: 0;
  }

  #suggestionList li a {
    height: 30px;
    line-height: 30px;
    margin-top: -1px;
    background-color: #f6f6f6;
    text-decoration: none;
    font-size: 15px;
    color: #409eff;
    display: block;
  }

  #suggestionList li .item_info {
    font-size: 12px;
    color: grey;
  }

  #suggestionList li a:hover:not(.header) {
    background-color: #eee;
  }
  .list {
    float: left;
    background: #fff;
    height: 580px;
    overflow: overlay;
    z-index: 9999;
    top: 230px;
    left: 30px;
  }
  .heightbooy {
    padding: 10px;
    width: 290px;
    height: 80px;
  }
  .borderstyle {
    height: 75px;

    overflow: hidden;
    border-bottom: 1px dashed #918e8e;
  }
  .borderstyle.hover {
    color: #409eff;
  }
  .borderstyle.active {
    background: #fff;
  }
}
</style>
