interface Props {
  title: string;

  content: string;
}

export default function JobInfoCard({ title, content }: Props) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="mt-6 whitespace-pre-line text-slate-600 leading-relaxed">
        {content}
      </div>
    </div>
  );
}
