
import React, { useState } from 'react';
import { Campaign, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface DonationModalProps {
  campaign: Campaign;
  lang: Language;
  onClose: () => void;
  onSuccess: (amount: number, name: string) => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ campaign, lang, onClose, onSuccess }) => {
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';
  const predefinedAmounts = [50, 100, 200, 500];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate CMI redirect / response
    setTimeout(() => {
      onSuccess(amount, name || 'Fael Khair');
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-[40px] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        {/* Header with Attijari Style coloring/logos */}
        <div className={`p-8 border-b border-gray-100 flex justify-between items-center bg-emerald-50/30 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className="flex items-center gap-2 mb-1">
               <img src="https://i.ibb.co/C3X9f3t/logo-abvos.png" alt="Logo" className="h-6" />
               <h2 className="text-xl font-black text-gray-900">{lang === 'ar' ? 'بوابة التبرع الآمن' : 'Don Sécurisé'}</h2>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{campaign.title[lang]}</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-200 rounded-2xl transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleDonate} className="p-10 space-y-8">
          {/* Amount Selection */}
          <div className="space-y-4">
            <label className={`block text-xs font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
               {lang === 'ar' ? 'اختر المبلغ (درهم)' : 'Choisir le montant (DH)'}
            </label>
            <div className="grid grid-cols-4 gap-3">
              {predefinedAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {setAmount(val); setCustomAmount('');}}
                  className={`py-4 rounded-2xl border-2 font-black transition-all ${
                    amount === val && !customAmount
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-gray-300 text-gray-400'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="relative">
               <span className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400 font-bold`}>DH</span>
               <input
                 type="number"
                 placeholder={lang === 'ar' ? 'مبلغ آخر' : 'Montant libre'}
                 value={customAmount}
                 onChange={(e) => {
                   setCustomAmount(e.target.value);
                   const n = parseFloat(e.target.value);
                   if (!isNaN(n)) setAmount(n);
                 }}
                 className={`w-full ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} py-4 rounded-2xl border-2 outline-none transition-all ${
                   customAmount ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-gray-100 focus:border-emerald-500'
                 }`}
               />
            </div>
          </div>

          {/* Identity */}
          <div className="space-y-4">
            <input
              required
              type="text"
              placeholder={t.formName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
            />
            <input
              required
              type="email"
              placeholder={t.formEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
            />
          </div>

          {/* Payment Method Branding */}
          <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
             <div className="flex items-center justify-between opacity-70">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{lang === 'ar' ? 'طريقة الدفع' : 'Mode de paiement'}</span>
                <div className="flex gap-2">
                   <i className="fa-brands fa-cc-visa text-xl"></i>
                   <i className="fa-brands fa-cc-mastercard text-xl"></i>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                   <i className="fa-solid fa-credit-card text-emerald-600"></i>
                </div>
                <div className="text-sm">
                   <div className="font-black text-gray-900">Carte Bancaire (Marocaine/Internationale)</div>
                   <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Via CMI Gateway</div>
                </div>
             </div>
          </div>

          <button
            disabled={isProcessing || !amount}
            type="submit"
            className="w-full py-5 bg-gray-900 hover:bg-emerald-600 disabled:bg-gray-200 text-white font-black rounded-3xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            {isProcessing ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i><span>{t.processing}</span></>
            ) : (
              <><i className="fa-solid fa-lock"></i><span>{t.btnDonate} {amount.toLocaleString()} DH</span></>
            )}
          </button>
          
          <div className="flex flex-col items-center gap-2">
             <div className="flex items-center gap-3 grayscale opacity-40">
                <img src="https://i.ibb.co/L5kLzV5/cmi-logo.png" alt="CMI" className="h-4" />
                <img src="https://i.ibb.co/v4gH9Ld/attijari-logo.png" alt="Attijari" className="h-4" />
             </div>
             <div className="text-[9px] text-gray-400 font-bold uppercase tracking-[2px]">
                {t.secure}
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;
