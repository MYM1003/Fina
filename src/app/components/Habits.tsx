import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface HabitsProps {
  onComplete: (data: {
    knowsLastMonthExpenses: boolean;
    saves: boolean;
    invests: boolean;
  }) => void;
}

export function Habits({ onComplete }: HabitsProps) {
  const navigate = useNavigate();
  const [habits, setHabits] = useState({
    knowsLastMonthExpenses: null as boolean | null,
    saves: null as boolean | null,
    invests: null as boolean | null,
  });

  const isComplete = habits.knowsLastMonthExpenses !== null && 
                     habits.saves !== null && 
                     habits.invests !== null;

  const handleSubmit = () => {
    if (isComplete) {
      onComplete({
        knowsLastMonthExpenses: habits.knowsLastMonthExpenses!,
        saves: habits.saves!,
        invests: habits.invests!,
      });
      navigate('/goals');
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
              Tus hábitos
            </h2>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)' }}>
              Esto no es para juzgarte, es para ayudarte
            </p>
          </div>

          <div className="space-y-8">
            {/* Question 1 */}
            <div>
              <p className="text-lg mb-4 text-gray-700">
                ¿Sabés cuánto gastaste el mes pasado?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHabits({ ...habits, knowsLastMonthExpenses: true })}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    habits.knowsLastMonthExpenses === true
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => setHabits({ ...habits, knowsLastMonthExpenses: false })}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    habits.knowsLastMonthExpenses === false
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <p className="text-lg mb-4 text-gray-700">
                ¿Ahorrás regularmente?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHabits({ ...habits, saves: true })}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    habits.saves === true
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => setHabits({ ...habits, saves: false })}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    habits.saves === false
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <p className="text-lg mb-4 text-gray-700">
                ¿Invertís tu dinero?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHabits({ ...habits, invests: true })}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    habits.invests === true
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => setHabits({ ...habits, invests: false })}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    habits.invests === false
                      ? 'border-[#D4537E] bg-[#FBEAF0]'
                      : 'border-gray-200 bg-white hover:border-[#D4537E]/50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!isComplete}
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
          <div className="w-3 h-3 bg-[#D4537E] rounded-full"></div>
          <div className="w-3 h-3 bg-[#D4537E] rounded-full"></div>
          <div className="w-3 h-3 bg-[#D4537E] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
