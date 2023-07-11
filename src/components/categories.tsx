export default function Categories({ categories }: { categories: string[] }) {
  return (
    <ul className="flex gap-3 text-xs font-semibold">
      {categories.map((category: string) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  );
}
