import { getGlobal, firstComponent } from "@/lib/getGlobal";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const global = await getGlobal()?.catch(() => null);
  const navbar = firstComponent(global?.navbar);

  if (!navbar) return null;
  return <NavbarClient navbar={navbar} />;
}
