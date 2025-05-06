export default function initMouseTrail() {
  // mouse follow
  const circle = document.getElementById('circle');
  const innerCircle = document.getElementById('innerCircle');

  document.addEventListener('mousemove', (e) => {
    // Get the circle current dimensions
    const height = circle.offsetHeight;
    const width = circle.offsetWidth;
    const innerHeight = innerCircle.offsetHeight;
    const innerWidth = innerCircle.offsetWidth;

    // Inner circle follows the position of the mouse
    innerCircle.style.left = `${e.clientX - innerWidth / 2}px`;
    innerCircle.style.top = `${e.clientY - innerHeight / 2}px`;

    setTimeout(() => {
      // circle follows the position of the mouse like the smaller one. Play around with the time to find the proper trail
      circle.style.left = `${e.clientX - width / 2}px`;
      circle.style.top = `${e.clientY - height / 2}px`;
    }, 100);

    // Add class to inner circle when mouse is over a link or button
    const link = e.target.closest('a');
    const button = e.target.closest('button');
    const lightSwitch = e.target.closest('label');

    if (link || button || lightSwitch) {
      circle.classList.add('is-hidden');
    } else {
      circle.classList.remove('is-hidden');
    }
  });
}