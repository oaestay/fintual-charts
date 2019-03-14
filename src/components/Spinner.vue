<template>
  <div class="spinner">
    <div class="spinner__background">
      <div class="pixel-spinner">
        <div class="pixel-spinner-inner"></div>
      </div>
    </div>
  </div>
</template>
<style>
.spinner__background {
  align-items: center;
  background-color: #fff;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
}

.pixel-spinner, .pixel-spinner * {
  box-sizing: border-box;
}

.pixel-spinner {
  height: 70px;
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pixel-spinner .pixel-spinner-inner {
  width: calc(70px / 7);
  height: calc(70px / 7);
  background-color: #333;
  color: #333;
  box-shadow: 15px 15px  0 0,
              -15px -15px  0 0,
              15px -15px  0 0,
              -15px 15px  0 0,
              0 15px  0 0,
              15px 0  0 0,
              -15px 0  0 0,
              0 -15px 0 0;
  animation: pixel-spinner-animation 2000ms linear infinite;
}

@keyframes pixel-spinner-animation {
  50% {
    box-shadow: 20px 20px 0px 0px,
                -20px -20px 0px 0px,
                20px -20px 0px 0px,
                -20px 20px 0px 0px,
                0px 10px 0px 0px,
                10px 0px 0px 0px,
                -10px 0px 0px 0px,
                0px -10px 0px 0px;
  }
  75% {
    box-shadow: 20px 20px 0px 0px,
                -20px -20px 0px 0px,
                20px -20px 0px 0px,
                -20px 20px 0px 0px,
                0px 10px 0px 0px,
                10px 0px 0px 0px,
                -10px 0px 0px 0px,
                0px -10px 0px 0px;
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
