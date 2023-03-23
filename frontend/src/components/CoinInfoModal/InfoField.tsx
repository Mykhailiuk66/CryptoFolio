

type InfoFieldProps = {
  label: string;
  value: string | number | undefined;
}

const InfoField = ({ label, value }: InfoFieldProps) => {
  return (
    <p className="text-lg font-semibold flex w-full justify-between">
      <span className="text-green-400">{label}</span>
      <span>{value}</span>
    </p>
  );
};

export default InfoField;