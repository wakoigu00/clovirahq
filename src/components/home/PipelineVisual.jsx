export default function PipelineVisual() {
  return (
    <div className="relative mx-auto mt-16 max-w-md lg:mt-0">

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">

        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">
            Sales Pipeline
          </h3>

          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
            Live
          </span>
        </div>


        <div className="mt-6 space-y-4">


          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

            <p className="text-sm text-slate-400">
              Prospects Researched
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              250+
            </p>

          </div>


          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

            <p className="text-sm text-slate-400">
              Conversations Started
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              42
            </p>

          </div>


          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">

            <p className="text-sm text-blue-200">
              Meetings Booked
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              +12
            </p>

          </div>


        </div>

      </div>

    </div>
  );
}