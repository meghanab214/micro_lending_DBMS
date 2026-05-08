export default function FormField({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  step,
  min,
  max,
  rows,
  helpText,
  options = []
}) {
  const commonClass =
    'mt-2 w-full rounded-2xl border border-slate-700/80 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20';

  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 4}
          className={commonClass}
        />
      ) : type === 'select' ? (
        <select id={id} value={value} onChange={onChange} className={commonClass}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={step}
          min={min}
          max={max}
          className={commonClass}
        />
      )}
      {helpText ? <p className="mt-2 text-xs text-slate-400">{helpText}</p> : null}
    </label>
  );
}
