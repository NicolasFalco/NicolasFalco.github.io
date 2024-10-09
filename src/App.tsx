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
      <FormControl sx={{ m: 2, minWidth: 200 }} variant="outlined">
        <InputLabel sx={{top:-10}} id="pizza-select-label">Pizzas</InputLabel>
        <Select
          labelId="pizza-select-label"
          id="pizza-select"
          multiple
          value={selectedPizzas.map(pizza => pizza.name)}
          onChange={handlePizzaChange}
          renderValue={(selected) => (selected as string[]).join(',')}
          
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
        <FormControl sx={{ m: 2, minWidth: 180 }} key={pizza.name}>
          <InputLabel sx={{top:-10}} id={`quantity-select-label-${pizza.name}`}>{pizza.name} Cantidad</InputLabel>
          <Select
            labelId={`quantity-select-label-${pizza.name}`}
            id={`quantity-select-${pizza.name}`}
            value={pizza.quantity.toString()}
            onChange={(event) => handleQuantityChange(pizza.name, parseInt(event.target.value, 10))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ].map(quantity => (
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
      <FormControl sx={{ m: 2, minWidth: 200 }}>
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
        <FormControl sx={{ m: 2, minWidth: 180 }} key={lomo.name}>
          <InputLabel sx={{top:-10}} id={`quantity-select-label-${lomo.name}`}>{lomo.name} Cantidad</InputLabel>
          <Select
            labelId={`quantity-select-label-${lomo.name}`}
            id={`quantity-select-${lomo.name}`}
            value={lomo.quantity.toString()}
            onChange={(event) => handleQuantityChange(lomo.name, parseInt(event.target.value, 10))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(quantity => (
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
  const [step, setStep] = useState<number>(1);
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
        nombreUsuario,
        direccionUsuario,
        telefonoUsuario,
        enviarPedido,
      });
      setStep(3); 
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleWhatsAppClick = () => {
    if (!orderDetails) return;

    const pizzas = orderDetails.pizzas.map(pizza => `${pizza.quantity} x ${pizza.name}`).join('\n');
    const lomos = orderDetails.lomos.map(lomo => `${lomo.quantity} x ${lomo.name}`).join('\n');

    const mensaje = `Pedido de ${orderDetails.nombreUsuario}\nDirección: ${orderDetails.direccionUsuario}\nTeléfono: ${orderDetails.telefonoUsuario}\n\nPizzas:\n${pizzas || 'No hay pizzas seleccionadas'}\n\nLomos:\n${lomos || 'No hay lomos seleccionados'}\n\n¿Enviar pedido?: ${orderDetails.enviarPedido ? 'Sí' : 'No'}`;

    const whatsappUrl = `https://wa.me/3571570657?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, '_blank');
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
              nombre={nombreUsuario}
              direccion={direccionUsuario}
              telefono={telefonoUsuario}
              enviarPedido={enviarPedido}
            />
            <button onClick={handleNextStep} className="App-button" disabled={!nombreUsuario || !telefonoUsuario}>
              Siguiente
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1>¡Hace tu pedido!</h1>
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

        {step === 3 && orderDetails && (
          <div>
            <h1>Resumen del pedido</h1>
            <p>¿Enviar pedido?: {orderDetails.enviarPedido ? 'Sí' : 'No'}</p>
            <p>Nombre: {orderDetails.nombreUsuario}</p>
            <p>Dirección: {orderDetails.direccionUsuario}</p>
            <p>Teléfono: {orderDetails.telefonoUsuario}</p>
            <h2>Pizzas</h2>
            {orderDetails.pizzas.length > 0 ? (
              orderDetails.pizzas.map((pizza, index) => (
                <p key={index}>{pizza.quantity} x {pizza.name}</p>
              ))
            ) : (
              <p>0</p>
            )}
            <h2>Lomos</h2>
            {orderDetails.lomos.length > 0 ? (
              orderDetails.lomos.map((lomo, index) => (
                <p key={index}>{lomo.quantity} x {lomo.name}</p>
              ))
            ) : (
              <p>0</p>
            )}
 <button onClick={handleWhatsAppClick} className="App-button">
              Enviar por WhatsApp
            </button>

            <button onClick={handleBack} className="App-button">
              Volver
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
