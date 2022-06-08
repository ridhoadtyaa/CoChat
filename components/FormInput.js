const FormInput = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <>
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className="custom-input"
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    </>
  );
};

export default FormInput;
