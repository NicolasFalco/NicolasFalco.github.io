import React, { useState } from 'react';
import './App.css';
import FormPropsTextFields from './interfazPrincipal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

// Definir las interfaces de los elementos seleccionados y detalles de la orden
interface Item {
  name: string;
  quantity: number;
}

interface OrderDetails {
  pizzas: Item[];
  lomos: Item[];
  nombreUsuario: string;
  direccionUsuario: string;
  telefonoUsuario: string;
  enviarPedido: boolean;
}

// Componente para seleccionar Pizzas
const SelectPizzas: React.FC<{ setPizzas: (items: Item[]) => void }> = ({ setPizzas }) => {
  const [selectedPizzas, setSelectedPizzas] = useState<Item[]>([]);

  const handlePizzaChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    const updatedPizzas = selectedValues.map(value => {
      const existingItem = selectedPizzas.find(pizza => pizza.name === value);
      return existingItem ? existingItem : { name: value, quantity: 1 };
    });
    setSelectedPizzas(updatedPizzas);
    setPizzas(updatedPizzas);
  };

  const handleQuantityChange = (pizzaName: string, quantity: number) => {
    const updatedPizzas = selectedPizzas.map(pizza => 
      pizza.name === pizzaName ? { ...pizza, quantity } : pizza
    );
    setSelectedPizzas(updatedPizzas);
    setPizzas(updatedPizzas);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }} variant="outlined">
        <InputLabel sx={{top:-10}} id="pizza-select-label">Pizzas</InputLabel>
        <Select
          labelId="pizza-select-label"
          id="pizza-select"
          multiple
          value={selectedPizzas.map(pizza => pizza.name)}
          onChange={handlePizzaChange}
          renderValue={(selected) => (selected as string[]).join(', ')}
          
        >
          {['Muzarella', 'Argentina', 'Mexicana', 'Calabresa'].map(pizza => (
            <MenuItem key={pizza} value={pizza}>
              <Checkbox checked={selectedPizzas.some(item => item.name === pizza)} />
              <ListItemText primary={pizza} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Selecciona una o más pizzas</FormHelperText>
      </FormControl>

      {selectedPizzas.map(pizza => (
        <FormControl sx={{ m: 1, minWidth: 180 }} key={pizza.name}>
          <InputLabel sx={{top:-10}} id={`quantity-select-label-${pizza.name}`}>{pizza.name} Cantidad</InputLabel>
          <Select
            labelId={`quantity-select-label-${pizza.name}`}
            id={`quantity-select-${pizza.name}`}
            value={pizza.quantity.toString()}
            onChange={(event) => handleQuantityChange(pizza.name, parseInt(event.target.value, 10))}
          >
            {[1, 2, 3, 4, 5, 6].map(quantity => (
              <MenuItem key={quantity} value={quantity}>{quantity}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

// Componente para seleccionar Lomos
const SelectLomos: React.FC<{ setLomos: (items: Item[]) => void }> = ({ setLomos }) => {
  const [selectedLomos, setSelectedLomos] = useState<Item[]>([]);

  const handleLomoChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    const updatedLomos = selectedValues.map(value => {
      const existingItem = selectedLomos.find(lomo => lomo.name === value);
      return existingItem ? existingItem : { name: value, quantity: 1 };
    });
    setSelectedLomos(updatedLomos);
    setLomos(updatedLomos);
  };

  const handleQuantityChange = (lomoName: string, quantity: number) => {
    const updatedLomos = selectedLomos.map(lomo => 
      lomo.name === lomoName ? { ...lomo, quantity } : lomo
    );
    setSelectedLomos(updatedLomos);
    setLomos(updatedLomos);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel sx={{top:-10}} id="lomo-select-label">Lomos</InputLabel>
        <Select
          labelId="lomo-select-label"
          id="lomo-select"
          multiple
          value={selectedLomos.map(lomo => lomo.name)}
          onChange={handleLomoChange}
          renderValue={(selected) => (selected as string[]).join(', ')}
        >
          {['Simple', 'Especial', 'Completo', 'Vegetariano'].map(lomo => (
            <MenuItem key={lomo} value={lomo}>
              <Checkbox checked={selectedLomos.some(item => item.name === lomo)} />
              <ListItemText primary={lomo} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Selecciona uno o más lomos</FormHelperText>
      </FormControl>

      {selectedLomos.map(lomo => (
        <FormControl sx={{ m: 1, minWidth: 180 }} key={lomo.name}>
          <InputLabel sx={{top:-10}} id={`quantity-select-label-${lomo.name}`}>{lomo.name} Cantidad</InputLabel>
          <Select
            labelId={`quantity-select-label-${lomo.name}`}
            id={`quantity-select-${lomo.name}`}
            value={lomo.quantity.toString()}
            onChange={(event) => handleQuantityChange(lomo.name, parseInt(event.target.value, 10))}
          >
            {[1, 2, 3, 4, 5, 6].map(quantity => (
              <MenuItem key={quantity} value={quantity}>{quantity}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

// Componente principal
const App: React.FC = () => {
  const [step, setStep] = useState<number>(1); // Controla el paso actual
  const [message, setMessage] = useState<string>('¡Haz tu pedido!');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const [direccionUsuario, setDireccionUsuario] = useState<string>('');
  const [telefonoUsuario, setTelefonoUsuario] = useState<string>(''); 
  const [enviarPedido, setEnviarPedido] = useState<boolean>(false);

  const [selectedPizzas, setSelectedPizzas] = useState<Item[]>([]);
  const [selectedLomos, setSelectedLomos] = useState<Item[]>([]);

  const handleNextStep = () => {
    if (step === 1 && nombreUsuario && telefonoUsuario) {
      setStep(2); 
    } else if (step === 2) {
      setOrderDetails({
        pizzas: selectedPizzas,
        lomos: selectedLomos,
        nombreUsuario: nombreUsuario,
        direccionUsuario: direccionUsuario,
        telefonoUsuario: telefonoUsuario,
        enviarPedido: enviarPedido,
      });
      setStep(3); 
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleBackToStep2 = () => {
    setStep(2);
  };

  return (
    <div className="App">
      <header className="App-header">
        {step === 1 && (
          <div>
            <h1>Ingresa tus datos</h1>
            <FormPropsTextFields
              setNombre={setNombreUsuario} 
              setDireccion={setDireccionUsuario}
              setTelefono={setTelefonoUsuario}
              setEnviarPedido={setEnviarPedido} 
            />
            <button onClick={handleNextStep} className="App-button" disabled={!nombreUsuario || !telefonoUsuario}>
              Siguiente 
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1>{message}</h1>
            <SelectPizzas setPizzas={setSelectedPizzas} />
            <SelectLomos setLomos={setSelectedLomos} />
            <button onClick={handleNextStep} className="App-button">
              Finalizar Pedido
            </button>
            <button onClick={handleBack} className="App-button">
              Volver
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1>Pedido Confirmado</h1>
            <p><strong>Nombre:</strong> {orderDetails?.nombreUsuario}</p>
            <p><strong>Dirección:</strong> {orderDetails?.direccionUsuario}</p>
            <p><strong>Teléfono:</strong> {orderDetails?.telefonoUsuario}</p>
            <h2>Pizzas:</h2>
            {orderDetails?.pizzas.map(pizza => (
              <p key={pizza.name}>{pizza.name}: {pizza.quantity}</p>
            ))}
            <h2>Lomos:</h2>
            {orderDetails?.lomos.map(lomo => (
              <p key={lomo.name}>{lomo.name}: {lomo.quantity}</p>
            ))}
            <button onClick={handleBackToStep2} className="App-button">
              Volver a realizar un pedido
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
