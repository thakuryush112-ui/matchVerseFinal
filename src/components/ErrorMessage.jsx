export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box state-error" role="alert">
      <p><strong>Something went wrong.</strong> {message}</p>
      {onRetry && <button type="button" className="btn" onClick={onRetry}>Try again</button>}
    </div>
  );
}
