

type InfoFieldProps = {
  label: string;
  value: string | number | React.ReactNode | undefined;
  className?: string;
}

const InfoField = ({ label, value, className }: InfoFieldProps) => {
  return (
    <span className={"text-lg font-semibold flex w-full justify-between " + className}>
      <span className="text-green-400">{label}</span>
      <span>{value}</span>
    </span>
  );
};

export default InfoField;