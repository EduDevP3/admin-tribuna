import React, { useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Label, Input, Button, HelperText } from "@windmill/react-ui";
import apiClient from "../api";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas nuevas no coinciden" });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "La nueva contraseña debe tener al menos 6 caracteres" });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      setMessage({ type: "success", text: response.data.message });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error al cambiar la contraseña",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle>Configuración</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 max-w-2xl">
        <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Seguridad de la Cuenta
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Actualiza tu contraseña para mantener tu cuenta segura.
        </p>

        <form onSubmit={handleSubmit}>
          <Label>
            <span>Contraseña Actual</span>
            <Input
              className="mt-1"
              type="password"
              placeholder="***************"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Label>

          <Label className="mt-4">
            <span>Nueva Contraseña</span>
            <Input
              className="mt-1"
              type="password"
              placeholder="***************"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Label>

          <Label className="mt-4">
            <span>Confirmar Nueva Contraseña</span>
            <Input
              className="mt-1"
              type="password"
              placeholder="***************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Label>

          <div className="mt-6">
            <Button type="submit" disabled={loading} block>
              {loading ? "Procesando..." : "Actualizar Contraseña"}
            </Button>
          </div>

          {message.text && (
            <div className={`mt-4 p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
