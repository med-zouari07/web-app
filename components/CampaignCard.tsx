
import React from 'react';
import { Campaign, Language } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  onDonate: (campaign: Campaign) => void;
  lang: Language;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDonate, lang }) => {
  const progress = Math.min(100, (campaign.raised / campaign.goal) * 100);
  const isRTL = lang === 'ar';

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col group h-full">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={campaign.imageUrl} 
          alt={campaign.title[lang]} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <span className="px-3 py-1 rounded-full bg-white/95 text-[10px] font-black uppercase tracking-wider text-emerald-600 shadow-sm">
            {campaign.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-black mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
          {campaign.title[lang]}
        </h3>
        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
          {campaign.description[lang]}
        </p>
        
        <div className="mt-auto space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xl font-black text-gray-900">{campaign.raised.toLocaleString()} DH</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase block mt-1">
                {lang === 'ar' ? 'من أصل' : 'sur'} {campaign.goal.toLocaleString()} DH
              </span>
            </div>
            <span className="text-sm font-black text-emerald-600">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-400 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <button 
            onClick={() => onDonate(campaign)}
            className="w-full py-4 px-6 bg-gray-900 hover:bg-emerald-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 text-sm"
          >
            <span>{lang === 'ar' ? 'ساهم الآن' : lang === 'fr' ? 'Soutenir' : 'Contribute Now'}</span>
            <i className={`fa-solid ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs group-hover:translate-x-1 transition-transform`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
