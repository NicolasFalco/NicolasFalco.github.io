import React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface FormProps {
  setNombre: (value: string) => void;
  setDireccion: (value: string) => void;
  setTelefono: (value: string) => void;
  setEnviarPedido: (value: boolean) => void;
}

const FormPropsTextFields: React.FC<FormProps> = ({
  setNombre,
  setDireccion,
  setTelefono,
  setEnviarPedido
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío real del pedido si es necesario
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre y apellido"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        label="Dirección"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setDireccion(e.target.value)}
      />
      <TextField
        label="Teléfono"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setTelefono(e.target.value)}
      />

      <FormControlLabel 
        control={
          <Checkbox 
            onChange={(e) => setEnviarPedido(e.target.checked)}
            color="primary"
            
          />
        }
        label="Enviar pedido"
        style={{ color: 'black' }}
      />

     
    </form>
  );
};

export default FormPropsTextFields;
