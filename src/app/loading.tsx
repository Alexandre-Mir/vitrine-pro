export default function Loading() {
  return (
    <main>
      <section className="w-full bg-secondary sticky top-0 h-svh p-4 grid grid-cols-1 lg:grid-cols-2 grid-rows-[2fr_1fr] gap-4">
        <div className="relative w-full h-full rounded-2xl overflow-hidden lg:row-span-2 bg-neutral-200 animate-pulse" />
        <div className="hidden lg:block w-full h-full overflow-hidden rounded-2xl relative bg-neutral-200 animate-pulse" />
        <div className="w-full h-full bg-neutral-200 animate-pulse rounded-2xl flex flex-col items-center justify-center text-center p-10" />
      </section>

      <section className="relative z-10 bg-background">
        <div className="flex gap-4 p-4 lg:justify-center py-10 overflow-x-auto snap-x scrollbar-hide">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-6 max-w-[300px] w-[300px] shrink-0 items-center p-2.5 bg-secondary rounded-lg"
            >
              <div className="w-20 h-20 bg-neutral-200 animate-pulse rounded-lg" />
              <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded-md" />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="bg-secondary p-4 rounded-2xl lg:rounded-none flex gap-4 ml-4 lg:flex-col lg:items-center lg:justify-center lg:mx-auto">
            <div className="flex-none flex items-center justify-center w-12 lg:mr-10 lg:py-4">
              <div className="w-8 h-40 lg:w-40 lg:h-12 bg-neutral-200 animate-pulse rounded-md" />
            </div>

            <div className="flex-1 flex overflow-x-auto snap-x scrollbar-hide gap-4 lg:grid lg:grid-cols-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 h-[580px] w-full max-w-[360px] bg-neutral-200 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
