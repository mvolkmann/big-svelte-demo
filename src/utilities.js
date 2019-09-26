export function handleError(label, error) {
  const message = error.message || error;
  console.error(label, 'error:', message);
  //TODO: Implement this!
  //errorDialog(label, message);
}
