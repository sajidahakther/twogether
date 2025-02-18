import styles from "./TextInput.module.scss";

type TextInputProps = {
  label: string;
  value: string;
  type?: string;
  className?: string;
  required?: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = ({
  label,
  value,
  onChange,
  className,
  placeholder,
  type = "text",
  required = false,
}: TextInputProps) => {
  return (
    <div className={styles.textInput}>
      <label className={styles.label} htmlFor="input">
        {label}
      </label>
      <input
        id="input"
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} ${styles.input}`}
      />
    </div>
  );
};
