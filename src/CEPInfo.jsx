import { useState, useEffect } from "react";
import './CEPInfo.css';

function CEPInfo() {
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [estado, setEstado] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCep(e) {
    setCep(e.target.value);
  }

  useEffect(() => {
    const sanitizedCep = cep.replace(/\D/g, "");

    if (sanitizedCep.length !== 8) return;

    setLoading(true);

    fetch(`https://viacep.com.br/ws/${sanitizedCep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
            setBairro("");
            setRua("");
            setEstado("");
            setLocalidade("");
            setLoading(false);
            return;
          }

          setBairro(data.bairro || "");
          setRua(data.logradouro || "");
          setEstado(data.uf || "");
          setLocalidade(data.localidade || "");
          setLoading(false);
        })
        .catch(error => {
          console.error("Erro ao buscar CEP:", error);
          setLoading(false);
      });
  }, [cep]);

  return (
    <div className="cep-container">
      <h1 className="cep-title">CONSULTA DE CEP</h1>
      
      <input 
        type="text" 
        placeholder="INSIRA O SEU CEP" 
        onChange={handleCep}
        value={cep}
        className="cep-input"
      />
      
      {loading && <p className="cep-loading">Carregando...</p>}
      
      <div className="cep-info-container">
        <p><strong>RUA:</strong> {rua || '-'}</p>
        <p><strong>BAIRRO:</strong> {bairro || '-'}</p>
        <p><strong>CIDADE:</strong> {localidade || '-'}</p>
        <p><strong>ESTADO:</strong> {estado || '-'}</p>
      </div>
    </div>
  );
}

export default CEPInfo;