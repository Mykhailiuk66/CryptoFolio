
interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="container mt-6 mx-auto px-2 sm:px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 min-h-[70vh] text-zinc-700 dark:text-zinc-300 select-none">
      {children}
    </div>
  );
}


export default Container