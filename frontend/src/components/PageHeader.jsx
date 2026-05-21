function PageHeader({ eyebrow, title, copy }) {
  return (
    <header className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {copy && <p>{copy}</p>}
    </header>
  );
}

export default PageHeader;
