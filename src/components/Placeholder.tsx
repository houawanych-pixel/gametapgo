export default function Placeholder({ title, children, tag }: { title: string; children: React.ReactNode; tag: string }) {
  return (
    <div className="page">
      <h1>{title}</h1>
      <p className="muted">{children}</p>
      <span className="pill">{tag}</span>
    </div>
  );
}
