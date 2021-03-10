<template>
  <div class="center">
    <div class="select">
      <el-select v-model="mapUrl" @change="changeMap" placeholder="请选择地图类型">
        <el-option v-for="item in mapList" :key="item.id" :label="item.name" :value="item.url">
        </el-option>
      </el-select>
    </div>
    <div id="maps" class="center_map"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import mp4 from '../../assets/video/video.mp4'
import latlng from '../../assets/latlng'
export default {
  data () {
    return {
      map: null,
      mapList: [{
        id: 1,
        name: '智图地图',
        url: 'Geoq.Normal.Map'
      },
      {
        id: 5,
        name: '深蓝地图',
        url: 'Geoq.Normal.PurplishBlue'
      },
      {
        id: 6,
        name: '高德地图卫星',
        url: 'GaoDe.Satellite.Map'
      }
      ],
      mapUrl: 'Geoq.Normal.Map',
      // mapUrls: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // mapUrls: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
      option: {
        minZoom: 2,
        maxZoom: 16,
        center: [39.504714, 116.708049],
        zoom: 10,
        zoomControl: true, // 禁用 + - 按钮
        doubleClickZoom: true, // 禁用双击放大
        attributionControl: false, // 移除右下角leaflet标识
        dragging: true, // 禁止鼠标拖动滚动
        boxZoom: true, // 决定地图是否可被缩放到鼠标拖拽出的矩形的视图，鼠标拖拽时需要同时按住shift键.
        scrollWheelZoom: true // 禁止鼠标滚动缩放
      },
      options: {
        position: 'topleft',
        drawPolygon: true, // 添加绘制多边形
        drawMarker: true, // 添加按钮以绘制标记
        drawCircleMarker: true, // 添加按钮以绘制圆形标记
        drawPolyline: true, // 添加按钮绘制线条
        drawRectangle: true, // 添加按钮绘制矩形
        drawCircle: true, //  添加按钮绘制圆圈
        editMode: true, //  添加按钮编辑多边形
        dragMode: true, //   添加按钮拖动多边形
        cutPolygon: true, // 添加一个按钮以删除图层里面的部分内容
        removalMode: true // 清除图层
      },
      latlngList: [
        [39.104714, 117.608049],
        [39.404714, 117.508049],
        [39.304714, 117.808049],
        [39.604714, 117.308049],
        [39.904714, 117.208049]
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.createrMap()
    }, 500)
  },
  methods: {
    /* 创建地图实例 */
    createrMap () {
      this.map = this.$map.createrMap('maps', this.option)
      // this.$map.createrLayers(this.map, this.mapUrls) //切片地图
      this.$map.createrChinatm(this.map, this.mapUrl) // 图层
      this.map.pm.setLang('zh')
      this.map.pm.addControls(this.options)
      this.latlngList.forEach(item => {
        this.crarteMarker(item)
      })
      this.createrRegion()
    },
    /* 行政区域划分 */
    createrRegion () {
      let style = {
        'color': '#85C6FE', // 边框颜色
        'weight': 2, // 边框粗细
        'opacity': 0.9, // 透明度
        'fillColor': '#5DDEBB', // 区域填充颜色
        'fillOpacity': 0.2, // 区域填充颜色的透明
        'draggable': false
      }
      let region = L.geoJSON(latlng, {
        style: style
      }).addTo(this.map)
      this.map.fitBounds(region.getBounds())
    },
    /* 动态切换地图类型 */
    changeMap (map) {
      this.mapUrl = map
      this.$nextTick(() => {
        this.$map.createrChinatm(this.map, this.mapUrl)
      })
    },
    /* 创建标记点 */
    crarteMarker (item) {
      let marker = L.marker(item, {
        title: '坐标',
        opacity: 0.9,
        draggable: false
      }).addTo(this.map)
      marker.on('click', (data) => {
        let lat = data.latlng.lat
        let lng = data.latlng.lng
        this.createPopup([lat, lng])
      })
    },
    /* 创建弹出层 */
    createPopup (latlng) {
      let video = document.createElement('video')
      video.width = '300'
      video.height = '400'
      video.autoplay = 'autoplay'
      video.src = mp4
      L.popup({
        maxWidth: 300,
        minWidth: 200
      }).setLatLng(latlng)
        .setContent(video)
        .addTo(this.map)
    }
  }
}
</script>

<style lang="scss" scoped>
  .center {
    width: 100%;
    height: calc(100%);
    z-index: 1;
    margin: auto;

    .center_map {
      width: 100%;
      height: calc(100%);
      z-index: 1;
      margin: auto;
    }

    .select {
      width: 150px;
      position: absolute;
      top: 5%;
      left: 75%;
      z-index: 2;
    }
  }
</style>
