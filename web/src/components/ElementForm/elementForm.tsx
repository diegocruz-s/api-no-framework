import styles from './elementForm.module.css'

type ELementFormProps = {
    placeholder: string
    type: string
    value: string
    Icon: JSX.Element
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ElementForm ({ placeholder, value, onChange, type, Icon }: ELementFormProps) {

    return ( 
        <div className={styles.elementForm}>
            <label htmlFor={value.toLowerCase()}>{Icon}</label>
            <input
                type={type} 
                placeholder={placeholder} 
                onChange={onChange}
                name={value.toLowerCase()} 
            />
        </div>
    )
}