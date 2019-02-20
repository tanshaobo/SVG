function update() {
  let viewBox = [vx.value, vy.value, vw.value, vh.value].join(' ')
  let preserveAspectRatio = [align.value, meetOrSlice.value].join(' ')
  svg.setAttribute('viewBox', viewBox)
  svg.setAttribute('preserveAspectRatio', preserveAspectRatio)
  const rect = viewBoxIndicator;
  rect.setAttribute('x', vx.value);
  rect.setAttribute('y', vy.value);
  rect.setAttribute('width', vw.value);
  rect.setAttribute('height', vh.value);
}
form.addEventListener('input',update)
update()

