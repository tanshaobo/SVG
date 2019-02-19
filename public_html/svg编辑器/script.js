//svg自身定义的命名空间
const SVG_NS = 'http://www.w3.org/2000/svg'
//定义可创建类型
const shapeInfo = {
  rect: 'x:10,y:10,rx:0,ry:0,width:200,height:100',
  circle: 'cx:200,cy:200,r:50',
  ellipse: 'cx:200,cy:200,rx:80,ry:30',
  line:'x1:10,y1:10,x2:100,y2:100'
}
//默认公共属性
const defaultAttrs = {
  fill:'#FFFFFF',
  stroke:'#FF0000'
} ;
//获取工具栏
let createForm = document.getElementById('create-shape');  //创建区
let attrForm = document.getElementById('shape-attrs');   //属性区
let lookForm = document.getElementById('look-and-transform');//变换区
//生成svg
let svg = createSVG()
let selected = null
//选中生成的svg
svg.addEventListener('click',function(e){
    if(e.target.tagName.toLowerCase() in shapeInfo){
      select(e.target)
    }
})
//监听创建区，生成对应的形状
createForm.addEventListener('click',function(e){
  if(e.target.tagName.toLowerCase()== 'button'){
    create(e.target.getAttribute('create'))
  }
})
//监听属性区 将修改后的属性赋值给被选中的图形
attrForm.addEventListener('input',function(e){
  if(e.target.tagName.toLowerCase()!='input'){
    return
  }
  let handle = e.target
  selected.setAttribute(handle.name,handle.value)
})
//监听变换区  将修改后的变换值赋给被选中的图形
lookForm.addEventListener('input',function(e){
  if(e.target.tagName.toLowerCase()!='input'){
    return
  }
  if(!selected){
    return
  }
  
  selected.setAttribute('fill',fill.value)
  selected.setAttribute('stroke',stroke.value)
  selected.setAttribute('stroke-width',strokeWidth.value)
  selected.setAttribute('transform',encodeTransform({
                       tx:translateX.value,
                        ty:translateY.value,
                        scale:scale.value,
                        rotate:rotate.value
                        })
                       )
})
//创建svg函数
function createSVG(){
  let svg =document.createElementNS(SVG_NS,'svg')
  svg.setAttribute('width','100%')
  svg.setAttribute('height','100%')
  canvas.appendChild(svg)
  return svg
}
// 创建图形函数
function create(name){
  let shape = document.createElementNS(SVG_NS,name)
  svg.appendChild(shape)
  select(shape)
}
// 根据创建的图形，生成相应的属性区
function select(shape){
  let attrs = shapeInfo[shape.tagName].split(',')
  let attr,name,value
  attrForm.innerHTML=''
  while(attrs.length){
    attr = attrs.shift().split(':')
    name = attr[0]
    value = shape.getAttribute(name) || attr[1]
    createHandle(shape,name,value)
    shape.setAttribute(name,value)
  }
  for(name in defaultAttrs){
    value = shape.getAttribute(name) || defaultAttrs[name]
    shape.setAttribute(name, value)
  }
  selected = shape
  updateLookHandle()
}
//创建属性区函数
function createHandle(shape, name, value){
  let label = document.createElement('label')
  label.textContent = name
  let handle = document.createElement('input')
  handle.setAttribute('name', name)
  handle.setAttribute('type', 'range')
  handle.setAttribute('value', value)
  handle.setAttribute('min', 0)
  handle.setAttribute('max', 800)
  attrForm.appendChild(label)
  attrForm.appendChild(handle)
}
// 更新属性区
function updateLookHandle() {
  fill.value = selected.getAttribute('fill')
  stroke.value = selected.getAttribute('stroke')
  let t = decodeTransform(selected.getAttribute('transform'))
  translateX.value = t ? t.tx : 0
  translateY.value = t ? t.ty : 0
  rotate.value = t ? t.rotate : 0
  scale.value = t ? t.scale : 1
}
//变换区赋值
function decodeTransform(transString) {
const match = /translate\((\d+),(\d+)\)\srotate\((\d+)\)\sscale\((\d+)\)/.exec(transString)
return match ? {
  tx: +match[1],
  ty: +match[2],
  rotwte: +match[3],
  scale: +match[4]
}:null
}
//生成属性字符串
function encodeTransform(transObject){
  return [
    'translate(', transObject.tx, ',', transObject.ty, ') ',
            'rotate(', transObject.rotate, ') ',
            'scale(', transObject.scale, ')'
  ].join('')
}