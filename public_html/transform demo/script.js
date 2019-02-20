function target() {
  return document.getElementById(group.value)
}

// 把变换命令转换为字符串
// 't 10 10 r 30 s 1.3'  => 'translate(10, 10) rotate(30) scale(1.3)'
function tc2ts(tc) {
  let arr = (tc || '').split(' ')
  let ts = ''
  let elem,lastElemType
  const cmd = {
    't':'translate(',
    'r':'rotate(',
    's':'scale(',
    'm':'matrix('
  }
  while(elem = arr.shift()){
    if(cmd[elem]){
      if(lastElemType == 'number'){
        ts += ')'
      }
      ts += cmd[elem]
      lastElemType = 'command'
    }else{
      if(lastElemType =='number'){
        ts += ','
      }
      ts += elem
      lastElemType = 'number'
    }
  }
  if(ts.length){
    ts += ')'
    return ts
  }
}
group.oninput = function(){
  tc.value = target().tc|| ''
  ts.innerHTML = tc2ts(tc.value)
}
tc.oninput = function(){
  target().tc = tc.value
  target().setAttribute('transform',ts.innerHTML = tc2ts(tc.value))
}
