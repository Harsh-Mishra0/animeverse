import { firstComponent, getGlobal } from "@/lib/getGlobal";

export default async function Footer() {
  const global = await getGlobal()?.catch(() => null);
  const footer = firstComponent(global?.footer);

  if (!footer) return null;

  return (
    <footer className="border-t border-white/10 bg-black px-5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          {footer?.title ? <h2 className="text-2xl font-bold">{footer?.title}</h2> : null}
          {footer?.description ? <p className="mt-3 text-sm leading-7 text-white/55">{footer?.description}</p> : null}
        </div>
        {footer?.copyright ? <p className="text-sm text-white/40">{footer?.copyright}</p> : null}
      </div>
    </footer>
  );
}
