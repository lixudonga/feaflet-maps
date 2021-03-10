import L from 'leaflet'
/*
*创建地图实例
*/
const createrMap = (name, option) => {
  let map = L.map(name, option)
  return map
}
/*
*创建基本地图图层
*/
const createrLayers = (map, url, option) => {
  let layers = L.tileLayer(url, option)
  layers.addTo(map)
  return layers
}
/*
*使用chinatmsproviders插件创建
*/
const createrChinatm = (map, url, option) => {
  let chinatm = L.tileLayer.chinaProvider(url, option)
  chinatm.addTo(map)
  return chinatm
}
export default {
  createrMap,
  createrLayers,
  createrChinatm
}
