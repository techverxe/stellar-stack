/**
 * The Stellar Stack mark.
 *
 * The mark is the supplied brand artwork, served from `public/brand/` rather
 * than re-traced by hand, so it stays byte-identical to what the designer
 * produced. Its viewBox was tightened at install time (the original sits in a
 * 1500 square with wide transparent margins, which is impossible to size in a
 * header); the geometry itself is untouched.
 *
 * The wordmark is set in live text rather than being part of the image, so it
 * stays crisp at any size, is selectable, and is read correctly by screen
 * readers. The mark therefore carries `aria-hidden` and the accessible name
 * comes from the text beside it.
 */
export function Logo({
  variant = "white",
  withWordmark = true,
  className = "",
}: {
  variant?: "white" | "black";
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`logo ${className}`.trim()}>
      <img
        src={`/brand/mark-${variant}.svg`}
        alt={withWordmark ? "" : "Stellar Stack"}
        aria-hidden={withWordmark ? true : undefined}
        className="logo-mark"
        width={40}
        height={42}
        decoding="async"
      />
      {withWordmark && (
        <span className="logo-word">
          <span>Stellar</span>
          <span>Stack</span>
        </span>
      )}
    </span>
  );
}
