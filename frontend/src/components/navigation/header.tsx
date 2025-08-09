export function Header() {
  return (
    <div className="bg-red w-full h-[80px] b-red-500 p-2 justify-end flex items-center">
        
      <div className="flex w-[400px] h-[50px] bg-white border border-[#D1D5DB] items-center rounded-2xl px-3 py-1">
        <img
          src="/utility/searchIcon.svg"
          alt="Search Icon"
          className="h-[16px] w-[16px]"
        />
        <input
          type="text"
          placeholder="Search sets"
          
          onChange={(e) => (e.target.value)}
          className="flex-1 outline-none px-2 py-2 text-sm"
        />
      </div>
    </div>
  );
}
