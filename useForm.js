import React, { useState } from 'react'

export const useForm = (init) => {
  
    const [form, setForm] = useState(init)

    const handleChange = (e) => {
        const {value, name} = e.target;

        setForm(prev => ({
            ...form, [name]:value
        }))
    }

    return {
        form,
        ...form,
        onReset: () => setForm(init),
        onChange: handleChange
    }
}
