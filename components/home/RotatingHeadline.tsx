export default function RotatingHeadline() {
  return (
    <h1
      className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:mx-0 lg:text-7xl"
      style={{ color: "var(--color-heading)" }}
    >
      You Run Your Business.{" "}
      <span style={{ color: "var(--color-primary)" }}>
        We Build the Systems.
      </span>
    </h1>
  );
}
