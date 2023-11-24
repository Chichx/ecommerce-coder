import { useNavigate } from "react-router-dom";

export const Button = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(`${props.navigateLink}`)}
        className="mt-12  group relative inline-flex items-center overflow-hidden rounded-full bg-zinc-800 px-8 py-3 transition-all duration-500"
      >
        <div className="absolute inset-0 flex items-center [container-type:inline-size]">
          <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 duration-1000 group-hover:opacity-100"></div>
        </div>
        <div className="absolute inset-0.5 rounded-full bg-gray-300"></div>
        <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-400 group-hover:h-2/3 group-hover:opacity-100"></div>
        <span className="flex  items-center relative mt-px bg-gradient-to-b from-black/25 to-black bg-clip-text font-mona text-lg font-medium text-transparent transition-all duration-400">
          {props.text}
        </span>
      </button>
    </>
  );
};
