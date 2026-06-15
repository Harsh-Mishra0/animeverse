import { getGenres, getGlobal, firstComponent } from "@/lib/getGlobal";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const global = await getGlobal()?.catch(() => null);
  const navbar = firstComponent(global?.navbar);
  const hasGenreLink = navbar?.links?.some(
    (link) => (link?.type ?? link?.types) === "genre",
  );
  const genres = hasGenreLink ? await getGenres()?.catch(() => []) : [];

  if (!navbar) return null;
  return <NavbarClient navbar={navbar} genres={genres} />;
}
