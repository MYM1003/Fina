import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { g, Gender } from '../utils/gender';

interface ContextProps {
  gender?: Gender;
  onComplete: (data: { livesAlone: boolean }) => void;
}

export function Context({ gender, onComplete }: ContextProps) {
  const navigate = useNavigate();
  const [livesAlone, setLivesAlone] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (livesAlone !== null) {
      onComplete({ livesAlone });
      navigate('/activity');
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
              Contexto
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)' }}>
              Para entender mejor tu situación
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg mb-6 text-gray-700">¿Vivís {g(gender, 'sola', 'solo')}?</p>
            
            <button
              onClick={() => setLivesAlone(true)}
              className={`w-full p-6 rounded-2xl border-2 transition-all ${
                livesAlone === true
                  ? 'border-[#D4537E] bg-[#FBEAF0]'
                  : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
              }`}
            >
              <p className="text-lg" style={{ fontFamily: 'var(--font-sans)' }}>
                Sí, vivo {g(gender, 'sola', 'solo')}
              </p>
            </button>

            <button
              onClick={() => setLivesAlone(false)}
              className={`w-full p-6 rounded-2xl border-2 transition-all ${
                livesAlone === false
                  ? 'border-[#D4537E] bg-[#FBEAF0]'
                  : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
              }`}
            >
              <p className="text-lg" style={{ fontFamily: 'var(--font-sans)' }}>
                No, vivo {g(gender, 'acompañada', 'acompañado')}
              </p>
            </button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={livesAlone === null}
            className="w-full bg-[#D4537E] hover:bg-[#C14870] text-white py-6 rounded-full text-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </Button>
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex justify-center gap-2 mb-4">
          <div className="w-3 h-3 bg-[#D4537E] rounded-full"></div>
          <div className="w-3 h-3 bg-[#D4537E] rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
