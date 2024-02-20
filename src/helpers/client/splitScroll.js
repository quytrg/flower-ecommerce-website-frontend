function splitScroll(dur, cls) {
  const controller = new ScrollMagic.Controller()
  const triggerHook = document.querySelector('.header').offsetHeight

  new ScrollMagic.Scene({
    duration: dur,
    triggerElement: cls,
    triggerHook: triggerHook / window.innerHeight
  })
  .setPin(cls)
  // .addIndicators()
  .addTo(controller)
}

export default splitScroll
