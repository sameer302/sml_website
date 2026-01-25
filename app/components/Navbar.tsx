import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b px-8 py-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/people">People</Link>
      <Link href="/research">Research</Link>
      <Link href="/publications">Publications</Link>
      <Link href="/academics">Academics</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
