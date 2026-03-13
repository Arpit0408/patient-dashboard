interface HeaderProps {
  total: number;
}

export default function Header({ total }: HeaderProps) {
  return (
   <header className="w-full mb-6 bg-blue-500 flex items-center h-[70px] md:h-[110px] px-4 md:px-8">
  <div>
    <h1 className="text-xl md:text-3xl font-bold text-white">
      Patient Directory
    </h1>

    <p className="text-blue-100 text-sm md:text-base">
      {total} Patients Found
    </p>
  </div>
</header>
  );
}