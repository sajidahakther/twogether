import styles from "./TextInput.module.scss";

type TextInputProps = {
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label className={styles.label} htmlFor="input">
        {label}
      </label>
      <input
        id="input"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  );
};
