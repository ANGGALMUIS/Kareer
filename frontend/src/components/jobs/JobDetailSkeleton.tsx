export default function JobDetailSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Content */}

        <div className="space-y-6">
          <div className="animate-pulse rounded-3xl border bg-white p-8">
            <div className="h-10 w-2/3 rounded bg-slate-200" />

            <div className="mt-4 h-5 w-48 rounded bg-slate-200" />

            <div className="mt-6 flex gap-3">
              <div className="h-8 w-24 rounded-full bg-slate-200" />

              <div className="h-8 w-24 rounded-full bg-slate-200" />

              <div className="h-8 w-24 rounded-full bg-slate-200" />
            </div>
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-3xl border bg-white p-8"
            >
              <div className="h-8 w-52 rounded bg-slate-200" />

              <div className="mt-6 space-y-3">
                <div className="h-4 rounded bg-slate-200" />

                <div className="h-4 rounded bg-slate-200" />

                <div className="h-4 w-4/5 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}

        <div className="animate-pulse rounded-3xl border bg-white p-6">
          <div className="h-8 w-40 rounded bg-slate-200" />

          <div className="mt-6 h-12 rounded-xl bg-slate-200" />

          <div className="mt-4 h-12 rounded-xl bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
