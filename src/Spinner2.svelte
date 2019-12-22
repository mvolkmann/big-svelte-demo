<script>
  import { onMount } from 'svelte';

  export let size = 100;

  const HALF_SIZE = size / 2;

  const STROKE_WIDTH = 10;
  const HALF_STROKE = STROKE_WIDTH / 2;

  const DELTA_DEGREES = 5;
  const LARGE_ARC = 0;
  const RADIUS = HALF_SIZE - HALF_STROKE;
  const SWEEP = 0;
  const SWEEP_DEGREES = 60;
  const X_AXIS_ROTATION = 0;

  let element;
  let startDegrees = 0;
  let token;

  onMount(() => {
    if (element) {
      element.style.setProperty('--size', size + 'px');
      const s = element.style.getPropertyValue('--size');
    }

    token = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(token);
  });

  function animate() {
    startDegrees = (startDegrees - DELTA_DEGREES) % 360;
    token = requestAnimationFrame(animate);
  }

  const degreesToRadians = degrees => (degrees * Math.PI) / 180;

  // Must pass startDegrees as an argument to get reactivity!
  function getPathD(startDegrees) {
    const startAngle = degreesToRadians(startDegrees);
    const endAngle = degreesToRadians(startDegrees + SWEEP_DEGREES);

    const startX = HALF_SIZE + RADIUS * Math.cos(startAngle);
    const startY = HALF_SIZE - RADIUS * Math.sin(startAngle);
    const endX = HALF_SIZE + RADIUS * Math.cos(endAngle);
    const endY = HALF_SIZE - RADIUS * Math.sin(endAngle);

    const move = `M ${startX} ${startY}`;
    const arc = `A ${RADIUS} ${RADIUS} ${X_AXIS_ROTATION} ${LARGE_ARC} ${SWEEP} ${endX} ${endY}`;
    return move + ' ' + arc;
  }
</script>

<style>
  .progress {
    box-sizing: border-box;
    height: var(--size);
    width: var(--size);

    position: absolute;
  }

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 400;

    background-color: cornflowerblue;
    opacity: 0.7;
    border: solid gray 10px;
    border-radius: calc(var(--size) / 2);
    box-sizing: border-box;
    height: var(--size);
    width: var(--size);
  }

  svg {
    color: white;
    height: 40%;
    width: 40%;
  }
</style>

<div bind:this={element} class="spinner">
  <svg class="progress" width={size} height={size}>
    <path
      fill="none"
      stroke="red"
      stroke-width={STROKE_WIDTH}
      d={getPathD(startDegrees)} />
  </svg>
</div>
