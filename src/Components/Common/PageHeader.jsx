// Page title + optional button on the right
const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
    <div>
      <h1 className="font-heading text-2xl font-semibold text-neutral-900">{title}</h1>
      {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;
