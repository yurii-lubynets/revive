export function isDesktop(screenClass) {
  return screenClass === 'xl' || screenClass === 'lg'
}

export function isMobile(screenClass) {
  return screenClass === 'md' || screenClass === 'sm' || screenClass === 'xs'
}
