import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PersonalDataProps {
  onComplete: (data: { name: string; age: string; email: string }) => void;
}

export function PersonalData({ onComplete }: PersonalDataProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.email) {
      onComplete(formData);
      navigate('/context');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#FBEAF0] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <div className="mb-8">
            <h2 
              className="text-3xl mb-2 text-[#D4537E]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Empecemos por conocernos
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)' }}>
              Solo necesitamos algunos datos básicos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700">
                ¿Cómo te llamás?
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre"
                required
                className="mt-2 bg-white border-gray-200 focus:border-[#D4537E] focus:ring-[#D4537E] rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="age" className="text-gray-700">
                ¿Cuántos años tenés?
              </Label>
              <Input
                id="age"
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.age}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 0 || e.target.value === '') {
                    setFormData({ ...formData, age: e.target.value });
                  }
                }}
                placeholder="Edad"
                required
                min="18"
                max="100"
                className="mt-2 bg-white border-gray-200 focus:border-[#D4537E] focus:ring-[#D4537E] rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">
                Tu email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
                required
                className="mt-2 bg-white border-gray-200 focus:border-[#D4537E] focus:ring-[#D4537E] rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#D4537E] hover:bg-[#C14870] text-white py-6 rounded-full text-lg mt-8"
            >
              Continuar
            </Button>
          </form>
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-3 h-3 bg-[#D4537E] rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
