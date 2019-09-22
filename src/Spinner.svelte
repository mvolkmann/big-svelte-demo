<script context="module">
  let busy = true;
  let busyCounter = 0;
  let startTime;
 
  export function taskEnd() {
    if (busyCounter > 0) busyCounter--;
    if (busyCounter === 0) {
      const timeDisplayed = Date.now() - startTime;
      // Wait to hide spinner until it has been
      // displayed for a minimum amount of time.
      const waitTime = Math.max(0, MIN_TIME_TO_DISPLAY - timeDisplayed);
      setTimeout(() => (busy = false), waitTime);
    }
  }

  export function taskStart() {
    const alreadyBusy = busyCounter > 0;
    busyCounter++;
    if (!alreadyBusy) {
      // Wait a bit before showing spinner so
      // it never appears for short duration tasks.
      setTimeout(() => {
        startTime = Date.now();
        if (busyCounter > 0) busy = true;
      }, 500);
    }
  }
</script>

<script>
  import {onMount} from 'svelte';
  import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';

  const SIZE = 150;
  const HALF_SIZE = SIZE / 2;

  const STROKE_WIDTH = 10;
  const HALF_STROKE = STROKE_WIDTH / 2;

  const DELTA_DEGREES = 5;
  const LARGE_ARC = 0;
  const MIN_TIME_TO_DISPLAY = 1000;
  const RADIUS = HALF_SIZE - HALF_STROKE;
  const SWEEP = 0;
  const SWEEP_DEGREES = 60;
  const X_AXIS_ROTATION = 0;

  let startDegrees = 0;
  let token;

  onMount(async () => {
    token = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(token);
  });

  function animate(/*timestamp*/) {
    startDegrees = (startDegrees - DELTA_DEGREES) % 360;
    console.log('Spinner animate: startDegrees =', startDegrees);
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
    /* Must match SIZE above. */
    --size: 150px;

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

{#if busy}
  <div class="spinner">
    <svg class="progress" width={SIZE} height={SIZE}>
      <path
        fill="none"
        stroke="red"
        stroke-width={STROKE_WIDTH}
        d={getPathD(startDegrees)} />
    </svg>
    <!--{faCircle}-->
  </div>
{/if}
