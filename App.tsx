
import React, { useState, useEffect } from 'react';
import { Campaign, View, Language } from './types';
import { CAMPAIGNS, TRANSLATIONS, CONTACT_INFO } from './constants';
import { geminiService } from './services/geminiService';
import CampaignCard from './components/CampaignCard';
import DonationModal from './components/DonationModal';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [view, setView] = useState<View>('home');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thankYouLetter, setThankYouLetter] = useState('');
  const [lastDonation, setLastDonation] = useState<{amount: number, name: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const filteredCampaigns = CAMPAIGNS.filter(c => {
    const titleMatch = c.title[lang].toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch;
  });

  const handleDonateClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDonationSuccess = async (amount: number, name: string) => {
    setIsModalOpen(false);
    setLastDonation({ amount, name });
    setView('success');
    
    if (selectedCampaign) {
      setThankYouLetter('');
      const letter = await geminiService.generateThankYouLetter(selectedCampaign, amount, name, lang);
      setThankYouLetter(letter);
    }
  };

  // SVG Logo from the user provided image representation
  const AB_LOGO = (
    <div className="relative w-12 h-12 flex items-center justify-center">
       <div className="absolute inset-0 bg-white rounded-full border-2 border-gray-900 shadow-sm overflow-hidden">
          <img src="https://i.ibb.co/C3X9f3t/logo-abvos.png" alt="A.B.V.O.S Logo" className="w-full h-full object-contain p-1" />
       </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setView('home')}>
            {AB_LOGO}
            <div className="hidden sm:block">
               <span className="text-xl font-black tracking-tight text-gray-900 block leading-none">
                 {t.orgName}
               </span>
               <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block mt-1">
                 Bon Voisinage
               </span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-500">
            <button onClick={() => setView('home')} className={`hover:text-emerald-600 transition-colors ${view === 'home' ? 'text-emerald-600' : ''}`}>{t.navDiscover}</button>
            <button onClick={() => setView('campaigns')} className={`hover:text-emerald-600 transition-colors ${view === 'campaigns' ? 'text-emerald-600' : ''}`}>{t.navWork}</button>
            <a href="#contact" className="hover:text-emerald-600 transition-colors">{t.navJoin}</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                    lang === l ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {l === 'ar' ? 'العربية' : l.toUpperCase()}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setView('campaigns')}
              className="bg-emerald-600 text-white text-xs md:text-sm font-bold px-4 md:px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
            >
              {t.btnDonate}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Sections */}
      <main>
        {view === 'home' && (
          <>
            <section className="relative pt-12 md:pt-24 pb-20 overflow-hidden">
              <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} -z-10 w-1/2 h-full bg-emerald-50 rounded-bl-[100px] hidden lg:block`}></div>
              <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2 space-y-8 animate-in slide-in-from-bottom duration-700">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {lang === 'ar' ? 'العمل الاجتماعي بأولاد برحيل' : lang === 'fr' ? 'Action Sociale à Ouled Berhil' : 'Social Action in Ouled Berhil'}
                  </div>
                  <h1 className="text-4xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
                    {t.heroTitle}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed">
                    {t.heroSub}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setView('campaigns')}
                      className="px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl text-lg"
                    >
                      {t.btnExplore}
                    </button>
                    <a 
                      href="#about"
                      className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 font-bold rounded-2xl hover:border-emerald-600 transition-all text-lg text-center"
                    >
                      {lang === 'ar' ? 'تعرف علينا' : 'À propos'}
                    </a>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full animate-in fade-in zoom-in duration-1000 delay-200">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" 
                      alt="Solidarity in Morocco" 
                      className="rounded-[40px] shadow-2xl w-full aspect-video object-cover"
                    />
                    <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-white p-6 rounded-3xl shadow-xl hidden md:block border border-emerald-50`}>
                      <div className="text-3xl font-black text-emerald-600">+1000</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                         {lang === 'ar' ? 'عائلة مستفيدة' : 'Familles bénéficiaires'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About the Association */}
            <section id="about" className="py-24 bg-white">
               <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                  <div className="flex justify-center">{AB_LOGO}</div>
                  <h2 className="text-3xl font-black text-gray-900">{t.orgFullName}</h2>
                  <p className="text-xl text-gray-500 leading-relaxed italic">
                    {t.aboutText}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
                     <div className="p-6 bg-emerald-50 rounded-3xl">
                        <i className="fa-solid fa-hand-holding-heart text-2xl text-emerald-600 mb-3"></i>
                        <h4 className="font-black text-sm">{lang === 'ar' ? 'الإحسان' : 'Charité'}</h4>
                     </div>
                     <div className="p-6 bg-blue-50 rounded-3xl">
                        <i className="fa-solid fa-check-double text-2xl text-blue-600 mb-3"></i>
                        <h4 className="font-black text-sm">{lang === 'ar' ? 'المصداقية' : 'Crédibilité'}</h4>
                     </div>
                     <div className="p-6 bg-orange-50 rounded-3xl">
                        <i className="fa-solid fa-lightbulb text-2xl text-orange-600 mb-3"></i>
                        <h4 className="font-black text-sm">{lang === 'ar' ? 'المبادرة' : 'Initiative'}</h4>
                     </div>
                     <div className="p-6 bg-purple-50 rounded-3xl">
                        <i className="fa-solid fa-award text-2xl text-purple-600 mb-3"></i>
                        <h4 className="font-black text-sm">{lang === 'ar' ? 'التميز' : 'Excellence'}</h4>
                     </div>
                  </div>
               </div>
            </section>

            {/* Featured Campaigns */}
            <section className="py-24 bg-gray-50">
               <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                     <div>
                        <h2 className="text-4xl font-black text-gray-900 mb-2">{t.navWork}</h2>
                        <div className="w-20 h-1.5 bg-emerald-500 rounded-full"></div>
                     </div>
                     <button onClick={() => setView('campaigns')} className="text-emerald-600 font-bold flex items-center gap-2 hover:translate-x-1 transition-all">
                        {t.btnExplore} <i className={`fa-solid ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
                     </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {CAMPAIGNS.map(c => <CampaignCard key={c.id} campaign={c} lang={lang} onDonate={handleDonateClick} />)}
                  </div>
               </div>
            </section>
          </>
        )}

        {view === 'campaigns' && (
          <section className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-4xl font-black">{t.navWork}</h1>
              <p className="text-gray-500 max-w-xl mx-auto">{lang === 'ar' ? 'شاركنا في بناء مستقبل أفضل لساكنة تارودانت وأولاد برحيل.' : 'Participez avec nous à la construction d\'un avenir meilleur pour Taroudant.'}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map(c => <CampaignCard key={c.id} campaign={c} lang={lang} onDonate={handleDonateClick} />)}
            </div>
          </section>
        )}

        {view === 'success' && (
          <section className="max-w-3xl mx-auto px-4 py-24 text-center space-y-8 animate-in slide-in-from-bottom duration-1000">
             <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
               <i className="fa-solid fa-mosque"></i>
             </div>
             <h2 className="text-4xl font-black">{t.thankYou}</h2>
             <p className="text-xl text-gray-500">
               {lang === 'ar' ? `ساهمت بمبلغ ${lastDonation?.amount} درهم لدعم المحتاجين.` : `Vous avez contribué ${lastDonation?.amount} DH pour soutenir les nécessiteux.`}
             </p>

             <div className="bg-white p-10 rounded-[40px] shadow-2xl text-left border-2 border-emerald-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <img src="https://i.ibb.co/C3X9f3t/logo-abvos.png" alt="watermark" className="w-40" />
               </div>
               <h4 className={`text-xs font-black uppercase tracking-widest text-emerald-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                 {lang === 'ar' ? 'رسالة من الجمعية' : 'Message de l\'Association'}
               </h4>
               {thankYouLetter ? (
                 <p className={`text-lg text-gray-700 italic leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                   "{thankYouLetter}"
                 </p>
               ) : (
                 <div className="flex flex-col items-center py-8 gap-4">
                   <i className="fa-solid fa-circle-notch fa-spin text-emerald-500 text-3xl"></i>
                   <p className="text-gray-400">Drafting impact letter...</p>
                 </div>
               )}
             </div>

             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={() => setView('home')} className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl">
                 {lang === 'ar' ? 'العودة للرئيسية' : 'Retour à l\'accueil'}
               </button>
               <button className="px-8 py-4 bg-white text-emerald-600 border border-emerald-100 font-bold rounded-2xl">
                 <i className="fa-solid fa-share-nodes mr-2"></i> {lang === 'ar' ? 'انشر الخير' : 'Partager'}
               </button>
             </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-24 pb-12 mt-20">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     {AB_LOGO}
                     <span className="text-xl font-black">{t.orgName}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                     {lang === 'ar' ? 'جمعية حسن الجوار للأعمال الاجتماعية، إطار مدني ينهل من قيم الإحسان والمصداقية.' : 'Action sociale et solidarité à Ouled Berhil, Province de Taroudant.'}
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all"><i className="fa-brands fa-facebook-f"></i></a>
                     <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all"><i className="fa-brands fa-instagram"></i></a>
                     <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all"><i className="fa-brands fa-whatsapp"></i></a>
                  </div>
               </div>

               <div>
                  <h4 className="font-bold text-lg mb-6">{t.addressTitle}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {CONTACT_INFO.address[lang]}
                  </p>
               </div>

               <div>
                  <h4 className="font-bold text-lg mb-6">{t.contactTitle}</h4>
                  <ul className="space-y-4 text-sm text-gray-400">
                     <li className="flex items-center gap-3"><i className="fa-solid fa-phone text-emerald-500"></i> {CONTACT_INFO.phone}</li>
                     <li className="flex items-center gap-3"><i className="fa-solid fa-mobile-screen text-emerald-500"></i> {CONTACT_INFO.mobile}</li>
                     <li className="flex items-center gap-3"><i className="fa-solid fa-envelope text-emerald-500"></i> {CONTACT_INFO.email}</li>
                  </ul>
               </div>

               <div>
                  <h4 className="font-bold text-lg mb-6">{lang === 'ar' ? 'التبرع السريع' : 'Don Rapide'}</h4>
                  <p className="text-xs text-gray-500 mb-4">{t.secure}</p>
                  <img src="https://i.ibb.co/L5kLzV5/cmi-logo.png" alt="CMI Logo" className="h-10 opacity-50 grayscale hover:grayscale-0 transition-all mb-4" />
                  <div className="flex gap-2">
                     <img src="https://i.ibb.co/v4gH9Ld/attijari-logo.png" alt="Attijariwafa" className="h-6 opacity-30" />
                  </div>
               </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
               <span>&copy; 2024 {t.orgFullName} - All Rights Reserved</span>
               <div className="flex gap-8">
                  <a href="#">Privacy</a>
                  <a href="#">Terms</a>
                  <a href="#">Tax Receipt</a>
               </div>
            </div>
         </div>
      </footer>

      {/* Modal */}
      {isModalOpen && selectedCampaign && (
        <DonationModal 
          campaign={selectedCampaign} 
          lang={lang} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleDonationSuccess} 
        />
      )}
    </div>
  );
};

export default App;
