/** Serif "E·" wordmark, matching the reference app's logo. */
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <span
      aria-label="Extroverts"
      className="inline-flex select-none items-start font-serif font-bold leading-none text-white"
      style={{ fontSize: size, fontFamily: "'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif" }}
    >
      E
      <span
        className="mt-[0.08em] inline-block rounded-full bg-white"
        style={{ width: size * 0.16, height: size * 0.16 }}
      />
    </span>
  );
}
