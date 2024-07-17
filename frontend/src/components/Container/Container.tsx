

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`mt-4 mx-auto px-2 sm:px-4 md:px-6 min-h-[85vh] select-none ${className}`}>
      {children}
    </div>
  );
}

export default Container;
