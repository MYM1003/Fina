import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ActivityProps {
  onComplete: (data: { 
    worksOrStudies: 'works' | 'studies' | 'both' | 'neither';
    monthlyIncome: number;
  }) => void;
}

export function Activity({ onComplete }: ActivityProps) {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<'works' | 'studies' | 'both' | 'neither' | null>(null);
  const [income, setIncome] = useState('');

  const handleSubmit = () => {
    if (activity && income) {
      const parsedIncome = parseFloat(income.replace(/\./g, ''));
      // Validate that income is a positive number
      if (parsedIncome >= 0) {
        onComplete({
          worksOrStudies: activity,
          monthlyIncome: parsedIncome
        });
        navigate('/bank');
      }
    }
  };

  const formatCurrency = (value: string) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, '');
    // Prevent leading zeros except for "0" itself
    const cleanNumbers = numbers.replace(/^0+/, '') || '0';
    // Ensure non-negative
    const numValue = parseInt(cleanNumbers);
    if (numValue < 0) return '0';
    // Format with thousands separator
    return cleanNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const getIncomeLabel = () => {
    if (activity === 'works' || activity === 'both') {
      return '¿Cuánto cobrás por mes?';
    }
    return '¿Cuánto recibís por mes?';
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
              Tu actividad
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)' }}>
              Esto nos ayuda a personalizar tu análisis
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-lg mb-4 text-gray-700">¿Trabajás o estudiás?</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => setActivity('works')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    activity === 'works'
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  Trabajo
                </button>

                <button
                  onClick={() => setActivity('studies')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    activity === 'studies'
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  Estudio
                </button>

                <button
                  onClick={() => setActivity('both')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    activity === 'both'
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  Ambas
                </button>

                <button
                  onClick={() => setActivity('neither')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    activity === 'neither'
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  Ninguna
                </button>
              </div>
            </div>

            {activity && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4"
              >
                <Label htmlFor="income" className="text-gray-700">
                  {getIncomeLabel()}
                </Label>
                <div className="relative mt-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="income"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={income}
                    onChange={(e) => setIncome(formatCurrency(e.target.value))}
                    placeholder="0"
                    required
                    className="pl-8 bg-white border-gray-200 focus:border-[#D4537E] focus:ring-[#D4537E] rounded-xl"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Incluí sueldo, freelance, alquiler o cualquier ingreso que recibas regularmente
                </p>
              </motion.div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!activity || !income}
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
          <div className="w-3 h-3 bg-[#D4537E] rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
