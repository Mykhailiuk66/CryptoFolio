
type Props = {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="mt-4 mx-auto px-2 sm:px-4 md:px-6 min-h-[70vh] select-none">
      {children}
    </div>
  );
}


export default Container